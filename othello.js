var player = 1;
var tablier;
function OthelloCell(cell)
{
	this.player = 0;
	this.cell = cell;
	var self = this;
	this.setColor = function(color)
	{
		if(color == "black")
		{
			self.player = 1;
		}
		if(color == "white")
		{
			self.player = 2;
		}
		self.cell.classList.add(color);
	};
	this.swap = function()
	{
		if(self.player == 1)
		{
			self.player = 2;
			self.cell.classList.remove("black");
			self.cell.classList.add("white");
		}
		else if(self.player == 2)
		{
			self.player = 1;
			self.cell.classList.add("black");
			self.cell.classList.remove("white");
		}
	};
}
function computeGameLogic(x, y, player)
{
	var isLegal = false;
	var cellsToChange = new Array();
	var tempCellToChange = new Array();
	var itsWork = false;
	// direction -y
	for(var i = y - 1; i >= 0; i--)
	{
		if(tablier[i][x].player == 0)
		{
			tempCellToChange = [];
			break;
		}
		else if(tablier[i][x].player == player)
		{
			itsWork = true;
			break;
		}
		else
		{
			tempCellToChange.push(tablier[i][x]);
		}
	}
	if(itsWork)
	{
		for (var i = tempCellToChange.length - 1; i >= 0; i--)
		{
			cellsToChange.push(tempCellToChange[i]);
		}
		itsWork = false;
	}
	tempCellToChange = [];

	// direction +y
	for(var i = y + 1; i < 8; i++)
	{
		if(tablier[i][x].player == 0)
		{
			tempCellToChange = [];
			break;
		}
		else if(tablier[i][x].player == player)
		{
			itsWork = true;
			break;
		}
		else
		{
			tempCellToChange.push(tablier[i][x]);
		}
	}
	if(itsWork)
	{
		for (var i = tempCellToChange.length - 1; i >= 0; i--)
		{
			cellsToChange.push(tempCellToChange[i]);
		}
		itsWork = false;
	}
	tempCellToChange = [];

	// direction -x
	for(var i = x - 1; i >= 0; i--)
	{
		if(tablier[y][i].player == 0)
		{
			tempCellToChange = [];
			break;
		}
		else if(tablier[y][i].player == player)
		{
			itsWork = true;
			break;
		}
		else
		{
			tempCellToChange.push(tablier[y][i]);
		}
	}
	if(itsWork)
	{
		for (var i = tempCellToChange.length - 1; i >= 0; i--)
		{
			cellsToChange.push(tempCellToChange[i]);
		}
		itsWork = false;
	}
	tempCellToChange = [];

	// direction +x
	for(var i = x + 1; i < 8; i++)
	{
		if(tablier[y][i].player == 0)
		{
			tempCellToChange = [];
			break;
		}
		else if(tablier[y][i].player == player)
		{
			itsWork = true;
			break;
		}
		else
		{
			tempCellToChange.push(tablier[y][i]);
		}
	}
	if(itsWork)
	{
		for (var i = tempCellToChange.length - 1; i >= 0; i--)
		{
			cellsToChange.push(tempCellToChange[i]);
		}
		itsWork = false;
	}
	tempCellToChange = [];

	// direction -x-y
	for(var i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--)
	{
		if(tablier[j][i].player == 0)
		{
			tempCellToChange = [];
			break;
		}
		else if(tablier[j][i].player == player)
		{
			itsWork = true;
			break;
		}
		else
		{
			tempCellToChange.push(tablier[j][i]);
		}
	}
	if(itsWork)
	{
		for (var i = tempCellToChange.length - 1; i >= 0; i--)
		{
			cellsToChange.push(tempCellToChange[i]);
		}
		itsWork = false;
	}
	tempCellToChange = [];

	// direction -x+y
	for(var i = x - 1, j = y + 1; i >= 0 && j < 8; i--, j++)
	{
		if(tablier[j][i].player == 0)
		{
			tempCellToChange = [];
			break;
		}
		else if(tablier[j][i].player == player)
		{
			itsWork = true;
			break;
		}
		else
		{
			tempCellToChange.push(tablier[j][i]);
		}
	}
	if(itsWork)
	{
		for (var i = tempCellToChange.length - 1; i >= 0; i--)
		{
			cellsToChange.push(tempCellToChange[i]);
		}
		itsWork = false;
	}
	tempCellToChange = [];

	// direction +x+y
	for(var i = x + 1, j = y + 1; i < 8 && j < 8; i++, j++)
	{
		if(tablier[j][i].player == 0)
		{
			tempCellToChange = [];
			break;
		}
		else if(tablier[j][i].player == player)
		{
			itsWork = true;
			break;
		}
		else
		{
			tempCellToChange.push(tablier[j][i]);
		}
	}
	if(itsWork)
	{
		for (var i = tempCellToChange.length - 1; i >= 0; i--)
		{
			cellsToChange.push(tempCellToChange[i]);
		}
		itsWork = false;
	}
	tempCellToChange = [];

	// direction +x-y
	for(var i = x + 1, j = y - 1; i < 8 && j >=0; i++, j--)
	{
		if(tablier[j][i].player == 0)
		{
			tempCellToChange = [];
			break;
		}
		else if(tablier[j][i].player == player)
		{
			itsWork = true;
			break;
		}
		else
		{
			tempCellToChange.push(tablier[j][i]);
		}
	}
	if(itsWork)
	{
		for (var i = tempCellToChange.length - 1; i >= 0; i--)
		{
			cellsToChange.push(tempCellToChange[i]);
		}
		itsWork = false;
	}
	tempCellToChange = [];


	if(cellsToChange.length)
	{
		isLegal = true;
		for (var i = cellsToChange.length - 1; i >= 0; i--)
		{
			cellsToChange[i].swap();
		}
	}
	return isLegal;
}
function cellOnClick()
{
	var cell;
	var x, y;
	var finish = false;
	for(var i = 0; i < 8 && !finish; i++)
	{
		for(var j = 0; j < 8 && !finish; j++)
		{
			if(this == tablier[i][j].cell)
			{
				cell = tablier[i][j];
				x = j;
				y = i;
				finish = true;
			}
		}
	}
	if(computeGameLogic(x, y, player))
	{
		if(player == 1)
		{
			cell.setColor("black");
			player = 2;
		}
		else
		{
			cell.setColor("white");
			player = 1;
		}
		this.removeEventListener("click", cellOnClick);
		var playerScore1 = 0;
		var playerScore2 = 0;
		var finish = true;
		for(var i = 0; i < 8; i++)
		{
			for(var j = 0; j < 8; j++)
			{
				if(tablier[i][j].player == 1)
				{
					playerScore1++;
				}
				else if(tablier[i][j].player == 2)
				{
					playerScore2++;
				}
				else
				{
					finish = false;
				}
			}
		}
		$("#score1").html("Le joueur noir a : " + playerScore1 + " point(s).");
		$("#score2").html("Le joueur blanc a : " + playerScore2 + " point(s).");
		var turnElem = $("#turn");
		if(finish)
		{
			if(playerScore1 > playerScore2)
			{
				turnElem.html("Le joueur noir a gagné.");
			}
			else
			{
				turnElem.html("Le joueur blanc a gagné.");
			}
		}
		else
		{
			if(player == 1)
			{
				turnElem.html("C'est au joueur noir de jouer.");
			}
			else
			{
				turnElem.html("C'est au joueur blanc de jouer.");
			}
		}

	}
}

$(function(){
	tablier= new Array()
	var rows = document.querySelectorAll("table tr");
	for(var i = 0; i < 8; i++)
	{
		var collums = rows[i].querySelectorAll("td div");
		tablier[i] = new Array();
		for(var j = 0; j < 8; j++)
		{
			tablier[i][j] = new OthelloCell(collums[j]);
			if(i == 3 && j == 3)
			{
				tablier[i][j].setColor("white");			}
			else if(i == 3 && j == 4)
			{
				tablier[i][j].setColor("black");
			}
			else if(i == 4 && j == 3)
			{
				tablier[i][j].setColor("black");
			}
			else if(i == 4 && j == 4)
			{
				tablier[i][j].setColor("white");
			}
			else
			{
				collums[j].addEventListener("click", cellOnClick);
			}
		}
	}
})
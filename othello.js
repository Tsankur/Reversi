var player = 1;
var tablier;
var cellsToChange;
var bestNextCell;
function OthelloCell(cell, x, y)
{
	this.player = 0;
	this.cell = cell;
	this.x = x;
	this.y = y;
	cell.othelloCell = this;
	var self = this;
	this.setColor = function(color)
	{
		if(color == "black")
		{
			self.removeColor("halfBlack");
			self.cell.innerHTML = "";
			self.player = 1;
		}
		if(color == "white")
		{
			self.removeColor("halfWhite");
			self.cell.innerHTML = "";
			self.player = 2;
		}
		self.cell.classList.add(color);
	};
	this.removeColor = function(color)
	{
		self.cell.classList.remove(color);
	}
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
function isPlayable(x, y, player)
{
	var tempCellToChange = new Array();
	cellsToChange = new Array()
	function testDirection(dirX, dirY)
	{
		var itsWork = false;
		for(var i = x + dirX, j = y + dirY; i >= 0 && i < 8 && j >= 0 && j < 8; i+=dirX, j+=dirY)
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
	}
	testDirection(0, -1);
	testDirection(0, 1);
	testDirection(-1, 0);
	testDirection(1, 0);
	testDirection(-1, -1);
	testDirection(-1, 1);
	testDirection(1, 1);
	testDirection(1, -1);
	return cellsToChange.length;
}
function cellOnClick()
{
	var othelloCell = this.othelloCell;
	if(isPlayable(othelloCell.x, othelloCell.y, player))
	{
		if(cellsToChange.length)
		{
			for (var i = cellsToChange.length - 1; i >= 0; i--)
			{
				cellsToChange[i].swap();
			}
		}
		if(player == 1)
		{
			othelloCell.setColor("black");
			player = 2;
		}
		else
		{
			othelloCell.setColor("white");
			player = 1;
		}
		this.onclick = null;
		var playerScore1 = 0;
		var playerScore2 = 0;
		var finish = true;
		var playerBlocked = true;
		var bestResult = 0;
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
				if(tablier[i][j].player == 0)
				{
					tablier[i][j].removeColor("halfWhite");
					tablier[i][j].removeColor("halfBlack");
					tablier[i][j].cell.innerHTML = "";
					var resultPoints = isPlayable(j, i, player);
					if(resultPoints)
					{
						if(player == 1)
						{
							tablier[i][j].setColor("halfBlack");
						}
						else
						{
							if(resultPoints > bestResult)
							{
								bestResult = resultPoints;
								bestNextCell = tablier[i][j].cell;
							}
							tablier[i][j].setColor("halfWhite");
						}
						/*tablier[i][j].cell.innerHTML = resultPoints;*/
						playerBlocked = false;
					}
				}
			}
		}
		if(playerBlocked && !finish)
		{
			console.log("player " + player + " blocked");
			if(player == 1)
			{
				player = 2;
			}
			else
			{
				player = 1;
			}
			for(var i = 0; i < 8; i++)
			{
				for(var j = 0; j < 8; j++)
				{
					if(playerBlocked)
					{
						if(tablier[i][j].player == 0)
						{
							tablier[i][j].removeColor("halfWhite");
							tablier[i][j].removeColor("halfBlack");
							tablier[i][j].cell.innerHTML = "";
							var resultPoints = isPlayable(j, i, player);
							if(resultPoints)
							{
								if(player == 1)
								{
									tablier[i][j].setColor("halfBlack");
								}
								else
								{
									tablier[i][j].setColor("halfWhite");
								}
								/*tablier[i][j].cell.innerHTML = resultPoints;*/
								playerBlocked = false;
							}
						}
					}
				}
			}
			if(playerBlocked)
			{
				finish = true;
				if(playerScore1 > playerScore2)
				{
					playerScore1 = 64 - playerScore2;
				}
				else
				{
					playerScore2 = 64 - playerScore1;
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
		if(player == 2)
		{
			if (typeof bestNextCell.onclick == "function")
			{
				setTimeout(function(){
					bestNextCell.onclick.apply(bestNextCell);
				}, 500);
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
			tablier[i][j] = new OthelloCell(collums[j], j, i);
			if(i == 3 && j == 3)
			{
				tablier[i][j].setColor("white");
			}
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
				collums[j].onclick = cellOnClick;
			}
		}
	}
	for(var i = 0; i < 8; i++)
	{
		for(var j = 0; j < 8; j++)
		{
			if(tablier[i][j].player == 0)
			{
				var resultPoints = isPlayable(j, i, player);
				if(resultPoints)
				{
					if(player == 1)
					{
						tablier[i][j].setColor("halfBlack");
					}
					else
					{
						tablier[i][j].setColor("half>White");
					}
					/*tablier[i][j].cell.innerHTML = resultPoints;*/
					playerBlocked = false;
				}
			}
		}
	}
})
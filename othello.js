var player = 1;
var tablier;
function othelloCell(cell)
{
	this.player = 0;
	this.cell = cell;
	var self = this;
	this.setColor = function(color)
	{
		if(color == "black")
		{
			player = 1;
		}
		if(color == "white")
		{
			player = 2;
		}
		self.cell.classList.add(color);
	};
	this.swap = function()
	{
		if(player == 1)
		{
			player = 2;
			self.cell.classList.remove("black");
			self.cell.classList.add("white");
		}
		else if(player == 2)
		{
			player = 1;
			self.cell.classList.add("black");
			self.cell.classList.remove("white");
		}
	}
}
function computeGameLogic(x, y, player)
{
	var cellsToChange = new Array();
	// direction 1
	for(var i = y; i >= 0; i--)
	{
		if(tablier[x, i].player == 0)
		{
			cellsToChange = null;
			break;
		}
		else if(tablier[i, y].player == player)
		{
			break;
		}
		else
		{
			cellsToChange.push(tablier[i, y].cell);
		}
	}
	if(cellsToChange != null)
	{
		for (var i = cellsToChange.length - 1; i >= 0; i--)
		{
			cellsToChange[i].swap();
		}
	}
}
function cellOnClick()
{
	var cell;
	var x, y;
	for(var i = 0; i < 8; i++)
	{
		for(var j = 0; j < 8; j++)
		{
			if(this == tablier[i][j].cell)
			{
				cell = tablier[i][j];
				x = j;
				y = i;
				break;
			}
		}
	}
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
	computeGameLogic(x, y, cell.player);
	this.removeEventListener("click", cellOnClick);
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
			tablier[i][j] = new othelloCell(collums[j]);
			if(i == 3 && j == 3)
			{
				tablier[i][j].setColor("black");
				tablier[i][j].player = 1;
			}
			else if(i == 3 && j == 4)
			{
				tablier[i][j].setColor("white");
				tablier[i][j].player = 2;
			}
			else if(i == 4 && j == 3)
			{
				tablier[i][j].setColor("white");
				tablier[i][j].player = 2;
			}
			else if(i == 4 && j == 4)
			{
				tablier[i][j].setColor("black");
				tablier[i][j].player = 1;
			}
			else
			{
				collums[j].addEventListener("click", cellOnClick);
			}
		}
	}
})
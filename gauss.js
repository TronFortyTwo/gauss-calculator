function init()
{
	sessionStorage.setItem("ptnum", "0");
}


function addPoint()
{
	let table = document.getElementById("table");
	
	// update pts counter
	let ptnum = Number(sessionStorage.getItem("ptnum"));
	ptnum++;
	sessionStorage.setItem("ptnum", ptnum);
	
	// remove last row (button)
	table.deleteRow(ptnum);
	
	// add a new row to the table for the new point
	let new_row = document.createElement("tr");
	
	let cell1 = document.createElement("td");
	let cell2 = document.createElement("td");
	let cell3 = document.createElement("td");
	
	cell1.innerHTML = "PT&nbsp;" + ptnum;
	cell2.innerHTML = "<center><input id='inx' type='text' style='width:80%'></center>"
	cell3.innerHTML = "<center><input id='iny' type='text' style='width:80%'></center>"
	
	new_row.appendChild(cell1);
	new_row.appendChild(cell2);
	new_row.appendChild(cell3);
	
	table.appendChild(new_row);
	
	// create the new button
	let but_row = document.createElement("tr"); 
	but_row.colspan = "3";
	
	but_row.innerHTML = "<input id='b' type='button' onclick='confirm()' value='OK' style='width:100%'>";
	
	table.appendChild(but_row);
}

function confirm()
{
	let ptnum = Number(sessionStorage.getItem("ptnum"));
	let table = document.getElementById("table");
	
	let x = document.getElementById("inx").value;
	let y = document.getElementById("iny").value;
	
	// sanitize input
	x = x.replace(",", ".");
	y = y.replace(",", ".");
	
	// update point data
	sessionStorage.setItem("x"+ptnum, x);
	sessionStorage.setItem("y"+ptnum, y);
	
	// remove old rows
	table.deleteRow(ptnum+1);
	table.deleteRow(ptnum);
	
	// create new point row
	let new_row = document.createElement("tr");
	
	let cell1 = document.createElement("td");
	let cell2 = document.createElement("td");
	let cell3 = document.createElement("td");
	
	cell1.innerHTML = "PT " + ptnum;
	cell2.innerHTML = x;
	cell3.innerHTML = y;
	
	new_row.appendChild(cell1);
	new_row.appendChild(cell2);
	new_row.appendChild(cell3);
	
	table.appendChild(new_row);
	
	// create new button
	let but_row = document.createElement("tr"); 
	but_row.colspan = "3";
	
	but_row.innerHTML = "<input id='b' type='button' onclick='addPoint()' value='Add a point' style='width:100%'>";
	
	table.appendChild(but_row);
	
	updateArea();
}

function updateArea()
{
	let ptnum = Number(sessionStorage.getItem("ptnum"));
	
	let i = 0;
	
	let A = 0;
	
	for(i=1; i<=ptnum; i++)
	{
		let past_x = 0;
		let next_x = 0;
		let this_y = (sessionStorage.getItem("y"+i));
		
		if(i != 1)
			past_x = (sessionStorage.getItem("x"+(i-1)))
		else
			past_x = (sessionStorage.getItem("x"+ptnum));
			
		if(i != ptnum)
			next_x = (sessionStorage.getItem("x"+(i+1)))
		else
			next_x = (sessionStorage.getItem("x1"));
		
		A += this_y * ( next_x - past_x);
	}
	
	A /= 2;
	
	if(A < 0)
		A = -A;
	
	document.getElementById("area").innerHTML = "AREA: " + A;
}

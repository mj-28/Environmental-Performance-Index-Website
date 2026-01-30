/**
 * This function creates the table with all EPI data when the button is clicked
 * It is done by fetching data from the database in json format.
 * @function 
 * @name createTable
 */
function createTable(){
	/**
	 * (within function: createTable)
	 * Bringing in all the database into a variable on this js file to make it easier to work with
	 * @var data 
	 */
	//Storing the database data in the variable data
	var data = EPIresult;

	/**
	 * (within function: createTable)
	 * Creating an array in which the headers of the database are saved into
	 * The data is then "pushed" into it using a for loop runing through the data variable
	 * @var col  
	 */
	//Stores the column names to make them headings in the table
	var col = [];

	for (var i = 0; i <data.length; i++){
		for(var key in data[i]) {
			if (col.indexOf(key) === -1){
				col.push(key);
			}
		}
	}


	/**
	 * (within function: createTable)
	 * Creating the table element using DOM createElement
	 * @var table 
	 */
	//Creating the table using DOM
	var table = document.createElement("table");

	/**
	 * (within function: createTable)
	 * Creating a variable to be used later which inserts a row directly
	 * @var tr 
	 */
	//Creating a variable that inserts a row directly
	var tr = table.insertRow(-1);

	/**
	 * (within function: createTable)
	 * Using a for loop to iterate through the "col" variable with all the database headings in order to make them headings in the table as 'th' elements
	 * @var th 
	 */
	//Creating the headers
	for (var i = 0; i<col.length; i++){
		var th = document.createElement("th");
		th.innerHTML = col[i];
		th.style.color = "black";
		th.style.backgroundColor = "lightgrey";
		tr.appendChild(th);

	}

	/**
	 * Iterating through the data and adding rows and for each row added iterating through the columns in order to add the data 
	 */
	//Inserting the data into the rows
	for (var i = 0; i < data.length; i++) {
		tr = table.insertRow(-1)

		for (var j =0; j < col.length; j++) {
			var tabCell = tr.insertCell(-1);
			tabCell.innerHTML = data[i][col[j]];
		}
	}

	/**
	 * (within function: createTable)
	 * Getting the id of the element in which the table will be added to
	 * The table is added by getting that elements innerHTML making it empty and appending the table to it
	 * @var divData 
	 */
	//Telling the code where to load the table within the html (in the paragraph with id "five")
	var divData = document.getElementById('five');
	divData.innerHTML = "";
	divData.appendChild(table);

}

/**
 * The function search() is used to create the search bar for the table. This is done by retrieving the input, table and rows with the data of the table
 * Then filtering through each row and specifically the second column which is the column with the names of the country's. 
 * It filters to see if the combination of characters the user has entered is found within any of the country name
 * @function
 * @name search
 */
//Search bar function
function search() {
	
	
	/** 
	 * (within function: search)
	 * Retrieving user input from search bar in the html
	 * @var input 
	*/
	/** 
	 * (within function: search)
	 * Creating a variable to store the input in all uppercase
	 * This is done so that there is no issue with different syntax problems when comparing the input and the data within the table
	 * @var filter
	*/
	/** 
	 * (within function: search)
	 * Retrieving the table that was created in the earlier function and appended to the element with id "five"
	 * @var table 
	*/
	/** 
	 * (within function: search)
	 * Retrieving the rows in the table to then use to find the ones with data containing the user input in them
	 * @var tr 
	*/
	/** 
	 * (within function: search)
	 * Created at the beginning but actually defined later within the for loop
	 * This will store the country name of the row being itterated through to then be compared to the earlier (user input) variable 'filter'
	 * @var txtValue 
	*/
	//Creating all the variables required for the search bar to work
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("searchBar");
	filter = input.value.toUpperCase();
	table = document.getElementById("five");
	tr = table.getElementsByTagName("tr");

	//Iterating through the rows and getting the country name data to evaluate it against user input

	for (i = 0; i < tr.length; i++) {
	  //getting the country name for that row
	  td = tr[i].getElementsByTagName("td")[2];

	  if (td) {
		//for the td making a variable txtValue containing the text of that td (country name)
		txtValue = td.textContent || td.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
		  //if the txtValue (in upper case) is the same as the earlier created variable 'filter' then the row is displayed
		  tr[i].style.display = "";
		} else {
		  //else, the input characters are not contained then no rows are displayed
		  tr[i].style.display = "none";
		}
	  }
	}
  }

//Creating the bar chart
/**
 * d3 barplot code used; No author. Button to change input data in barplot (upgraded): https://www.d3-graph-gallery.com/graph/barplot_button_data_hard.html (2018)
 * {@link https://www.d3-graph-gallery.com/graph/barplot_button_data_hard.html}
 */

/**
 * (for bar chart creation)
 * Defining the first set of values for the top 5 countries
 * @constant data1 
 */
const data1 = [
	{group: "Denmark", value: 82.5},
	{group: "Luxembourg", value: 82.3},
	{group: "Switzerland", value: 81.5},
	{group: "United Kingdom", value: 81.3},
	{group: "France", value: 80}


 ];
 
 /**
 * (for bar chart creation)
 * Defining the second set of values for the top 5 countries
 * @constant data2 
 */
 const data2 = [
	{group: "Denmark", value: 7.3},
	{group: "Luxembourg", value: 11.6},
	{group: "Switzerland", value: 8.6},
	{group: "United Kingdom", value: 9},
	{group: "France", value: 5.8}
 ];
 
 /**
 * (for bar chart creation)
 * Defining the margins for the bar chart and the rectangles
 * @constant margin 
 */
//margins for bar chart
 const margin = {top: 30, right: 30, bottom: 70, left: 60},
	width = 460 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

// appending the svg object to the page
/**
 * (for bar chart)
 * adding svg to the page with d3 at the element with id 'seven' 
 * @constant svg 
 */
const svg = d3.select("#seven")
  .append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
	.attr("transform", `translate(${margin.left},${margin.top})`);

/**
 * (for bar chart)
 * Created to initialising the x axis using d3
 * @constant x  
 */
//X axis
const x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
const xAxis = svg.append("g")
  .attr("transform", `translate(0,${height})`)

  /**
 * (for bar chart)
 * Created to initialising the y axis using d3
 * @constant y  
 */
//Y axis
const y = d3.scaleLinear()
  .range([ height, 0]);
const yAxis = svg.append("g")
  .attr("class", "myYaxis")


/**
 * This function is called when the user clicks on one of the two buttons to see data on the bar chart whichever button is called the barchart will be updated with that data through this function
 * @function update
 * @param {array} data This is the array to which the data will be represented on the bar chart
 */
function update(data) {

  //Getting x and y axis
  x.domain(data.map(d => d.group))
  xAxis.call(d3.axisBottom(x))

  y.domain([0, d3.max(data, d => d.value) ]);
  yAxis.transition().duration(1000).call(d3.axisLeft(y));

/**
 * (for function: update())
 * This variable is used to represent all the rectangles on the bar chart to be updated
 * @var u 
 */

  var u = svg.selectAll("rect")
	.data(data);

  // updating the rectangles with the correct data
  u
	.enter().append("rect")
	.merge(u)
    .transition() 
    .duration(1000)
	  .attr("x", d => x(d.group))
	  .attr("y", d => y(d.value))
	  .attr("width", x.bandwidth())
	  .attr("height", d => height - y(d.value))
	  .attr("fill", "#69b3a2")

  u
	.exit()
	.remove()
	  
}

/**
 * This function is called when the user presses the submit button on the form
 * It retrieves all data from the form and sends an alert with the data
 * @function
 * @name submitData 
 */
//submit form function
function submitData() {


	/**
	 * (for function: submitData())
	 * Using DOM the user input for their email is retrieved and stored in this variable
	 * @var emailUser 
	 */
	/**
	 * (for function: submitData())
	 * Using DOM the user input for their comment is retrieved and stored in this variable
	 * @var commentUser 
	 */
	var emailUser = document.getElementById("userEmail").value;
	var commentUser = document.getElementById("commentUser").value;
	alert("Thank you for your submission :) " + "email: "+ emailUser +" comment: " + commentUser );

}

/**
 * This function is called when the abreviation meanings button is called
 * It allows to display the full list of all the abbreviation meanings
 * @function
 * @name openList 
 */
//list of abreviation
function openList(){

	/**
	 * (for function openList())
	 * Retrieving the list of the abrreviation and their meaning to then evaluate whether it is shown when the button is clicked and if it isn't then display it and if it is then hide it
	 * @var list 
	 */
	var list = document.getElementById("abrevList");

    if (list.style.display == "none"){
        list.style.display = "block";
    }else{
        list.style.display = "none";
    }	
}



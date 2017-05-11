var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Ufcvette1!",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
});

function manager() {
	console.log("Welcome Superior");
	console.log("---------------------------------");

	inquirer.prompt([
	{
		type: "list",
		name: "main",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
		message: "What would you like to do today?"
	},
	]).then(function(answer) {
		if(answer.main === "View Products for Sale") {
			list();
		}
		else if(answer.main === "View Low Inventory") {
			low();
		}
		else if(answer.main === "Add to Inventory") {
			add();
		}
		else{
			addPro();
		};
	});
};

function list() {
	console.log("Available Items for Sale:");
	console.log("--------------------------------------");
	connection.query("SELECT Item_id, Product_Name, Price, Stock_Quantity FROM products", 
					function(err, res) {
		                for (var i = 0; i < res.length; i++) {
		    				console.log(res[i].Item_id + " | " + res[i].Product_Name + " | " + "$" + res[i].Price + " | " + res[i].Stock_Quantity + " remaining");
		  					console.log("-----------------------------------");
							}
		inquirer.prompt([
		{	
			type: "list",
			name: "listend",
			message: "Would you like to return to the main menu?",
			choices: ["Yes", "No"]
		},
		]).then(function(answer) {
			if(answer.listend === "Yes") {
				manager();
			}
			else {
				process.exit("code")
			};
		});
					});
};

function low() {
	console.log("Warning! Quantity at or below 5 for following items");
	connection.query("SELECT * FROM products WHERE Stock_Quantity BETWEEN '0' AND '5'", function(err, res) {
		for(var i =0; i < res.length; i++) {
			console.log(" | " + res[i].Product_Name + " | " + "$" + res[i].Price + " | " + res[i].Stock_Quantity + " remaining");
			console.log("-----------------------------------------------------");
		}

	inquirer.prompt([
		{	
			type: "list",
			name: "listend",
			message: "Would you like to return to the main menu?",
			choices: ["Yes", "No"]
		},
		]).then(function(answer) {
			if(answer.listend === "Yes") {
				manager();
			}
			else {
				process.exit("code")
			};
		});
	});

}

function add() {
	connection.query("SELECT Item_id, Product_Name, Price, Stock_Quantity FROM products", 
					function(err, res) {
		                for (var i = 0; i < res.length; i++) {
		    				console.log(res[i].Item_id + " | " + res[i].Product_Name + " | " + "$" + res[i].Price + " | " + res[i].Stock_Quantity + " remaining");
		  					console.log("-----------------------------------");
							}
			inquirer.prompt([
	{
		type: "input",
		name: "IDitem",
		message: "Please Enter ID of Item You Would Like To Increase the Stock Of",
		validate: function(value) {
	  		if (isNaN(value) === false) {
	    		return true;
	  			}
	  			return false;
			},
	},
	]).then(function(answer) {
		  connection.query("SELECT * FROM products WHERE ?", {Item_id: answer.IDitem}, function(err, res){
		  	console.log("-----------------------------------------------------");
		    console.log(" |" + res[0].item_id + " |" + res[0].Product_Name + " |" + "$" +res[0].Price + " |" + res[0].Stock_Quantity + " remaining");
		    console.log("----------------------------------------------------");
		
				inquirer.prompt([
			{
				type: "input",
				message: "How many units would you like to add to the current stock?",
				name: "addStuff",
				validate: function(value) {
				  		if (isNaN(value) === false) {
				    		return true;
				  			}
				  			return false;
						},
			}
				]).then(function(answer) {
					var updatedStock = res[0].Stock_Quantity + JSON.parse(answer.addStuff);
					connection.query("UPDATE products SET ? WHERE ?", [{Stock_Quantity: updatedStock},
						{Item_id: res[0].item_id}], function(err, res) {
							console.log("Stock Updated");
							console.log("-------------------------------------");
							
			inquirer.prompt([
		{	
			type: "list",
			name: "listend",
			message: "Would you like to return to the main menu?",
			choices: ["Yes", "No"]
		},
		]).then(function(answer) {
			if(answer.listend === "Yes") {
				manager();
			}
			else {
				process.exit("code")
			};
						})
				});
			});
		});
		});
	});
};	

function addPro() {
	inquirer.prompt([
	{
		type: "input",
		message: "Please input item's name",
		name: "nItemName"
	},
	{
		type: "input",
		message: "Please input which department this item belongs in",
		name: "nDept"
	},
	{
		type: "input",
		message: "Please input the price of this new item",
		name: "nPrice"
	},
	{
		type: "input",
		message: "Please input the current stock of this new item",
		name: "nStock"
	},
	]).then(function(answer) {
		connection.query("INSERT INTO products SET ?", {Product_Name: answer.nItemName, Department_Name: answer.nDept,
			Price: answer.nPrice, Stock_Quantity: answer.nStock}, function(err, res) {
				console.log("Item Successfully Added");
				console.log("----------------------------------------");

			inquirer.prompt([
		{	
			type: "list",
			name: "listend",
			message: "Would you like to return to the main menu?",
			choices: ["Yes", "No"]
		},
		]).then(function(answer) {
			if(answer.listend === "Yes") {
				manager();
			}
			else {
				process.exit("code")
			};
						})
			});
	});
}	
manager();
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

function start() {
	console.log("Available Items for Sale:");
	console.log("--------------------------------------");
	connection.query("SELECT Item_id, Product_Name, Price FROM products", 
					function(err, res) {
		                for (var i = 0; i < res.length; i++) {
		    				console.log(res[i].Item_id + " | " + res[i].Product_Name + " | " + "$" + res[i].Price + " | ");
		  					console.log("-----------------------------------");
							};
	inquirer.prompt([
	{
		type: "input",
		name: "IDitem",
		message: "Please Enter ID of Item You Would Like To Purchase",
		validate: function(value) {
	  		if (isNaN(value) === false) {
	    		return true;
	  			}
	  			return false;
			},
	},
	]).then(function(answer) {
		  connection.query("SELECT * FROM products WHERE ?", {Item_id: answer.IDitem}, function(err, res){
		    console.log(" |" + res[0].item_id + " |" + res[0].Product_Name + " |" + "$" +res[0].Price + " |" + res[0].Stock_Quantity + " remaining");
			console.log("---------------------------------------------------");

	inquirer.prompt([
	{
		type: "input",
		message: "How many units would you like to buy?",
		name: "itemQuant",
		validate: function(value) {
	  		if (isNaN(value) === false) {
	    		return true;
	  			}
	  			return false;
			},
		}	
	]).then(function(answer) {
		if (answer.itemQuant > res[0].Stock_Quantity) {
			console.log("Insufficient quantity to fulfill order request. Please place order again");
			console.log("--------------------------------------------------------------------------")
			start();
		}
		else {
			var totalCost = answer.itemQuant * res[0].Price;
			var finalCost = totalCost.toFixed(2);
			var newQuant = res[0].Stock_Quantity - JSON.parse(answer.itemQuant);
				console.log("You're total will be: $" + finalCost);
					connection.query("UPDATE products SET ? WHERE ?", [{Stock_Quantity: newQuant},
					 {item_id: res[0].item_id}], function(err, res){	
					 if(err) throw err
					console.log("Thank you for your purchase. Please exit and visit Bamazon again soon");
			});
		}
		
	});
	});
});
});
};

start();

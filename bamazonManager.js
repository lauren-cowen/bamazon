var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'h78km9341ws?P',
	database: 'bamazon'
});

inquirer.prompt([
	{
		type: 'list',
		name: 'choice',
		message: 'What would you like to do?',
		choices:['View Products', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
	}

	]).then(function(answers){

		switch(answers.choice) {
			case 'View Products': 
			viewInventory('no');
			break;

			case 'View Low Inventory':
			viewLowInventory();
			break;

			case 'Add to Inventory':
			viewInventory(addInventory);
			break;
		}
	});

var viewInventory = function(callback) {
	connection.connect();
	connection.query('SELECT * FROM products', function(error, results){
		if(error) throw error;
		console.log("Item ID  Product Name  Price Stock Quantity");
		console.log("--------------------------------");
		for(i =0; i<results.length; i++) {
		console.log(results[i].item_id + "    " + results[i].product_name + "       $" + results[i].price.toFixed(2) + "   " + results[i].stock_quantity);
		}
		setTimeout(callback(), 2000);
	})
// if(callback) {
// 	callback();
// }

// else {
// 	connection.end();
// }
	
};

var viewLowInventory = function() {
	
	connection.query('SELECT * FROM products WHERE stock_quantity<5', function(error, results){
		if(error) throw error;
		console.log("Item ID  Product Name  Price Stock Quantity");
		console.log("--------------------------------");
		for(i =0; i<results.length; i++) {
		console.log(results[i].item_id + "    " + results[i].product_name + "       $" + results[i].price.toFixed(2) + "   " + results[i].stock_quantity);
		}

	})
	connection.end();
};

var addInventory = function() {
	
	
	inquirer.prompt([
	{
		type: 'input',
		name: 'item',
		message: 'Which item would you like to update?'
	},
	{
		type: 'input',
		name: 'quantity',
		message: 'How many would you like to add?'
		
	}
	]).then(function(answers){
		
		connection.query('UPDATE products SET ? WHERE ?',[
		{
			stock_quantity:answers.quantity
		},
		{
			item_id: answers.item
		}], function(error, result){
			if(error) throw error;
			console.log("Item Updated");
			
		})
	
	})
	

};



var newProduct= function() {

};




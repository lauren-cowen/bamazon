var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'h78km9341ws?P',
	database: 'bamazon'
});

connection.connect();
connection.query('SELECT * FROM products', function(error, results){
	if(error) throw error;
	var table = new Table({
    head: ['Item ID', 'Product Name', 'Price']
  , colWidths: [10, 20, 10]
});

	for(i =0; i<results.length; i++) {
		table.push(
    [results[i].item_id, results[i].product_name, '$' + results[i].price]
);
	}
	console.log(table.toString());
	purchaseItem();
})

var purchaseItem = function() {
	inquirer.prompt([
		{
			type: 'input',
			name: 'product',
			message: 'Please enter the item ID you would like to purchase'

		},

		{
			type: 'input',
			name: 'qnty',
			message: 'How many would you like to buy?'
		}

	]).then(function(answers){
		checkQuantity(answers.product, answers.qnty);
		
	})
};


var checkQuantity = function(productID, quantity) {
	connection.query('SELECT * FROM products WHERE item_id =?', [productID], function(error, results){
		if(results[0].stock_quantity >= quantity) {
			var totalPrice = results[0].price*quantity;
			var newQuantity = results[0].stock_quantity - quantity;
			completePurchase(productID, newQuantity, totalPrice);
		}

		else {
			console.log("Insufficient quantity!");
			connection.end();
		}
	})
};

var completePurchase = function(productID, quantity, totalPrice) {
	connection.query('UPDATE products SET ? WHERE ?', 
		[
		{
			stock_quantity: quantity
		}, 
		{
			item_id: productID
		}
	], function(error, result){
		if(error) throw error;
		console.log("Total Price: $" + totalPrice.toFixed(2));
		connection.end();
	})

};
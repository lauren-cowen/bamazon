var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'h78km9341ws?P',
    database: 'bamazon'
});

inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['View Products', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    }

]).then(function(answers) {

    switch (answers.choice) {
        case 'View Products':
            viewInventory('no');
            break;

        case 'View Low Inventory':
            viewLowInventory();
            break;

        case 'Add to Inventory':
            viewInventory(addInventory);
            break;

        case 'Add New Product':
        	newProduct();
        	break;
    }
});

var viewInventory = function(callback) {
    connection.connect();
    connection.query('SELECT * FROM products', function(error, results) {
        if (error) throw error;
       var table = new Table({
        head: ['Item ID', 'Product Name', 'Price', 'Stock'],
        colWidths: [10, 20, 10, 10]
    });
        for (i = 0; i < results.length; i++) {
        table.push(
            [results[i].item_id, results[i].product_name, '$' + results[i].price, results[i].stock_quantity]
        );
    }
    console.log(table.toString());

        if (typeof callback === "function") {
            callback();
        } else {
            connection.end();
        }
    })
};

var viewLowInventory = function() {

    connection.query('SELECT * FROM products WHERE stock_quantity<5', function(error, results) {
        if (error) throw error;
        var table = new Table({
        head: ['Item ID', 'Product Name', 'Price', 'Stock'],
        colWidths: [10, 20, 10, 10]
    });
         for (i = 0; i < results.length; i++) {
        table.push(
            [results[i].item_id, results[i].product_name, '$' + results[i].price, results[i].stock_quantity]
        );
    }
    console.log(table.toString());

    })
    connection.end();
};

var addInventory = function() {


    inquirer.prompt([{
            type: 'input',
            name: 'item',
            message: 'Which item would you like to update?'
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to add?'

        }
    ]).then(function(answers) {
        var currentQnty = 0;
        connection.query('SELECT * FROM products WHERE item_id =?', [answers.item], function(error, result) {
            if (error) throw error;
            currentQnty = parseInt(result[0].stock_quantity) + parseInt(answers.quantity);
            updateInventory(currentQnty, answers.item);

        });

    })


};

var updateInventory = function(newQnty, itemid) {
    connection.query('UPDATE products SET ? WHERE ?', [{
            stock_quantity: newQnty
        },
        {
            item_id: itemid
        }
    ], function(error, itemid) {
        if (error) throw error;
        console.log("Item Updated");
        connection.end();

    })
}



var newProduct = function() {
	inquirer.prompt([
	{
		type: 'input',
		name: 'productName',
		message: 'Please enter the name of the product'
	},
	{
		type: 'input',
		name: 'department',
		message: 'What department is the item located in?'
	},
	{
		type: 'input',
		name: 'price',
		message: "What is the price of the item?"
	},
	{
		type: 'input',
		name: 'quantity',
		message: 'How many of these items are in stock?'
	}]).then(function(answers){
		connection.query('INSERT INTO products SET ?', {
			product_name: answers.productName,
			department_name: answers.department,
			price: answers.price,
			stock_quantity: answers.quantity
		},
		function(error, result){
			if(error) throw error;
			console.log("Product Added");
			connection.end();
		})
	})

};
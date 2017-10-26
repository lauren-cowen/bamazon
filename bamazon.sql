DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(40) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT(10) NULL,
PRIMARY KEY (item_id)

);


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("hat", "clothing", 12.50, 50), ("pillow", "home", 10.00, 10),
 ("milk", "food", 4.50, 25), ("bread", "food", 3.23, 20), ("socks", "clothing", 2.50, 12),
 ("sheets", "home", 25.00, 5), ("tv", "electronics", 250.00, 2), ("cheese", "food", 1.50, 24),
 ("peanuts", "food", 3.75, 15), ("T-shirt", "clothing", 15.00, 15);

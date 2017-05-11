CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
Product_Name VARCHAR(40) NULL,
Department_Name VARCHAR(40) NULL,
Price DECIMAL(10, 2),
Stock_Quantity INT NULL,
PRIMARY KEY (Item_id)
);

INSERT INTO products(Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Swiffer", "Appliances", 12.20, 30);

INSERT INTO products(Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Switch", "Videogames", 300, 5);

INSERT INTO products(Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Sticker Pack", "Art", 10.50, 200);

INSERT INTO products(Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Telescope", "Toys", 200, 50);

INSERT INTO products(Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Sabertooth Skull", "Arts", 1520, 1);

INSERT INTO products(Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Phillipino Gold", "Decor", 500.23, 30);

INSERT INTO products(Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Faux Spaghetti and Meatballs", "Toys", 19.99, 100);

INSERT INTO products(Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Sandals", "Apparel", 9.99, 39);

INSERT INTO products(Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Metal Detector", "Toys", 49.99, 100);

INSERT INTO products(Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Alien Movie Collection", "Movies", 38.99, 3);

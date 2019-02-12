var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Puggl3s1",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt({
            name: "option",
            type: "list",
            message: "Menu Options:",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        })
        .then(function (answer) {
            if (answer.option === "View Products for Sale") {
                viewProducts();
            }
            else if (answer.option === "View Low Inventory") {
                viewLowInventory();
                1
            }
            else if (answer.option === "Add to Inventory") {
                addInventory();
            }
            else if (answer.option === "Add New Product") {
                addProduct();
            } else {
                connection.end();
            }
        });
}

function viewProducts() {
    connection.query("select * from product", function (err, results) {
        if (err) throw err;
        for (product in results) {
            console.log(results[product].product_id + ") " + results[product].product_name + " - $" + results[product].price + "  (stock: " + results[product].stock_quantity + ")");
        }
        console.log("--------------------------------------------------------------------");
        start();
    });
}

function viewLowInventory() {
    connection.query("select * from product where stock_quantity < 5", function (err, results) {
        if (err) throw err;
        for (product in results) {
            console.log(results[product].product_id + ") " + results[product].product_name + " - $" + results[product].price + "  (stock: " + results[product].stock_quantity + ")");
        }
        console.log("--------------------------------------------------------------------");
        start();
    });
}

function addInventory() {
    inquirer
        .prompt([
            {
                name: "product",
                type: "input",
                message: "What is the number id of the product you would like to increase inventory for?"
            },
            {
                name: "amount",
                type: "input",
                message: "How many would you like to add?"
            }
        ])
        .then(function (answer) {
            var product = answer.product;
            connection.query("select * from product where product_id = ?", [product], function (err, results) {
                var product_name = results[0].product_name;
                var new_amount = parseInt(answer.amount) + results[0].stock_quantity;
                connection.query("update product set stock_quantity = " + connection.escape(new_amount) + " where product_id = " + connection.escape(product),
                    function (err, results) {
                        if (err) throw err;
                        console.log("--------------------------------------------------------------------");
                        console.log("You now have " + new_amount + " " + product_name + "s in inventory!");
                        console.log("--------------------------------------------------------------------");
                        start();
                    });
            });
        });
}

function addProduct() {
    inquirer
        .prompt([
            {
                name: "product",
                type: "input",
                message: "What is name of the product you want to add?"
            },
            {
                name: "department",
                type: "input",
                message: "What is name of the department the product belongs to?"
            },
            {
                name: "price",
                type: "input",
                message: "what is the price of the product?"
            },
            {
                name: "amount",
                type: "input",
                message: "How many of this product do you have in inventory?"
            }
        ])
        .then(function (answer) {
            connection.query("insert into product (product_name, department_name, price, stock_quantity) VALUES (" + connection.escape(answer.product) + "," + connection.escape(answer.department) + "," + connection.escape(parseFloat(answer.price).toFixed(2)) + "," + connection.escape(answer.amount) + ")",
            function (err, results) {
                if (err) throw err;
                console.log("--------------------------------------------------------------------");
                console.log("You have added " + answer.product + " - $" + parseFloat(answer.price).toFixed(2) + "  (stock: " + answer.amount + ")  to bamazon!");
                console.log("--------------------------------------------------------------------");
                start();
            });
        });
}
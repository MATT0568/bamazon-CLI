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
  connection.query("select * from product", function (err, results) {
    if (err) throw err;
    for (product in results) {
      console.log(results[product].product_id + ") " + results[product].product_name + " - $" + parseFloat(results[product].price).toFixed(2));
    }
    console.log("--------------------------------------------------------------------");
    buyProduct();
  });
}

function buyProduct() {
  inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "What is the number id of the product you would like to buy?"
      },
      {
        name: "amount",
        type: "input",
        message: "How many would you like to buy?"
      }
    ])
    .then(function (answer) {
      console.log("--------------------------------------------------------------------");
      var product = answer.product;
      var amount = parseInt(answer.amount);
      connection.query("select * from product where product_id = ?", [product], function (err, results) {
        var currentStock = parseInt(results[0].stock_quantity);
        var product_name = results[0].product_name;
        var product_price = results[0].price;
        if (currentStock < amount) {
          console.log("Insufficient quantity!");
          console.log("--------------------------------------------------------------------");
          start();
        }
        else {
          currentStock = currentStock - amount;
          connection.query("UPDATE product SET stock_quantity = " + connection.escape(currentStock) + " where product_id = " + connection.escape(product),
            function (err, results) {
              if (err) throw err;
              console.log("You have purchased " + amount + " " + product_name + "s for $" + parseFloat(product_price * amount).toFixed(2));
              console.log("--------------------------------------------------------------------");
              start();
            });
        }
      });
    });
}
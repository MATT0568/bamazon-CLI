create database bamazon;

use bamazon;

create table product (
	product_id int(15) not null auto_increment,
    product_name varchar(25) not null unique,
	department_name varchar(25) not null,
	price float(15,2),
	stock_quantity int(15),
    primary key (product_id)
);

select * from product;

insert into product (product_name, department_name, price, stock_quantity) values ("Monitor", "Computers", 120.50, 200);
insert into product (product_name, department_name, price, stock_quantity) values ("Mouse", "Computers", 80.00, 5000);
insert into product (product_name, department_name, price, stock_quantity) values ("Desk Chair", "Office", 600.99, 50);
insert into product (product_name, department_name, price, stock_quantity) values ("Computer Desk", "Office", 1500.00, 10);

insert into product (product_name, department_name, price, stock_quantity) values ("Milk", "Food", 4.50, 2000);
insert into product (product_name, department_name, price, stock_quantity) values ("Sugar", "Food", 10.00, 100);
insert into product (product_name, department_name, price, stock_quantity) values ("Banana", "Food", 1.60, 50);
insert into product (product_name, department_name, price, stock_quantity) values ("Fan", "Office", 20.00, 150);
insert into product (product_name, department_name, price, stock_quantity) values ("Lamp", "Office", 15.00, 400);
insert into product (product_name, department_name, price, stock_quantity) values ("Keyboard", "Computers", 130.00, 600);

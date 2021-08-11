const sql = require("../db.js");

const Customer = (customer) => {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

Customer.getAll = (result) => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("Error fetching customers:\n", err);
      result(err, []);
    }
    console.log("customers:", res);
    result(null, res);
  });
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("Error while creating customer:\n", err);
      result(err, {});
      return;
    }
    console.log("New Customer:", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
    return;
  });
};

module.exports = Customer;

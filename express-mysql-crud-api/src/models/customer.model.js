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

Customer.update = (data, callback) => {
  console.log("data:", data);
  sql.query(
    "UPDATE customers SET name=? where id = ?",
    [data.name, data.id],
    (err, result, fields) => {
      if (err) {
        // console.error("Customer Update Error:\n", err);
        callback(err, []);
        return;
      }
      console.log("update response:", result, fields);
      callback(null, result);
      return;
    }
  );
};

Customer.delete = (id, callback) => {
  sql.query("DELETE FROM customers WHERE id=?", [id], (err, result) => {
    if (err) {
      callback({ message: err }, []);
    }
    console.log("response from query:", result);
    callback(null, { message: "User successfully deleted" });
  });
};
module.exports = Customer;

Customer.getById = (id, callback) => {
  sql.query(
    "SELECT * FROM customers WHERE id=?",
    [id],
    (err, result, fields) => {
      if (err) {
        callback(err, {});
      }
      console.log("query result:", result);

      callback(null, {
        message:
          result.len > 0
            ? "Customer fetched successfully"
            : "Customer not found",
        data: result,
      });
    }
  );
};

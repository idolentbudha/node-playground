const Customer = require("../models/customer.model");
const { body, validationResult } = require("express-validator");

exports.getAll = (req, res) => {
  Customer.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    else res.send(data);
  });
};

exports.create = (req, res) => {
  // TODO: Validate request
  // body("email").isEmail();
  // body("name").notEmpty().isString();

  const { email, name, active } = req.body;

  //   const newCustomer = new Customer({
  //       email:email,
  //       name:name,
  //       active:active
  //   });

  Customer.create(
    {
      email: email,
      name: name,
      active: active,
    },
    (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            "Ooops something went wrong. Couldn't create customer.\n" +
            err?.message
              ? err.message
              : "",
        });
        return;
      }
      res.send({ message: "New Customer", data: data });
    }
  );
};

exports.update = (req, res) => {
  const id = req.params.cId;

  Customer.update({ ...req.body, id }, (err, result) => {
    if (err) {
      res.status(500).send({
        message: "Oops something went wrong, could not update customer.\n",
        err,
      });
    }
    res.send({
      message: "Customer updated successfully",
      data: { ...req.body, id },
    });
  });
};

exports.delete = (req, res) => {
  const id = req.params?.cId;
  if (isNaN(+id)) {
    res.status(401).send({ message: "invalid data" });
  }
  Customer.delete(id, (err, response) => {
    if (err) {
      res.status(500).send({ message: "Could not delete customer.\n" + err });
    }
    res.send(response);
  });
};

exports.getById = (req, res) => {
  const id = req.params.cId;
  console.log(typeof +id, +id, id);
  if (isNaN(+id)) {
    res.status(401).send({ message: "invalid data" });
  }
  Customer.getById(id, (err, response) => {
    if (err) {
      res.status(500).send({ message: "Could not fetch customer.\n" + err });
    }
    res.send(response);
  });
};

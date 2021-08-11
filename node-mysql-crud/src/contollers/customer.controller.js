const Customer = require("../models/customer.model");

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

module.exports = (app) => {
  const customer = require("../contollers/customer.controller.js");

  //routes
  app.post("/customer/create", customer.create);
  app.get("/customers", customer.getAll);
  app.get("/customer/:cId", customer.getById);
  app.put("/customer/update/:cId", customer.update);
  app.delete("/customer/delete/:cId", customer.delete);
};

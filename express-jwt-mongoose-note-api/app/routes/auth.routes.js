auth = require("../controllers/auth.controller.js");
module.exports = (app) => {
  app.post("/register", auth.register);
  app.post("/login", auth.signIn);
  app.get("/home", auth.loginRequired, (req, res) => {
    res.json({ message: "I am HOME" });
  });
};

const db = require("../models/index");
const bcrypt = require("bcryptjs");
const UserModel = db.User;

exports.login = async (req, res) => {
  const actionUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  //TODO: validation
  const inputData = req.body;

  if (req.method == "POST") {
    console.log("POST METHOD LOGIN");
    const user = await UserModel.findOne({ where: { email: inputData.email } });

    if (user == null) {
      res.render("./auth/login", {
        title: "Login Page",
        error_message: "Invalid Email/Password",
        erros: [],
        actionUrl,
      });
      return;
    }
    var isPasswordCorrect = await bcrypt.compareSync(
      inputData.password,
      user.password
    );
    isPasswordCorrect ? res.redirect("/") : res.redirect("/auth/login");
    return;
  }
  //GET Request

  res.render("./auth/login", {
    title: "Login Page",
    error_message: "",
    actionUrl,
  });
};

exports.register = async (req, res) => {
  if (req.method == "POST") {
    // TODO: validation
    const inputData = req.body;

    console.log("User Data:", inputData);
    console.log(await bcrypt.hash(inputData.password, 10));

    const newUser = await UserModel.create({
      fullName: inputData.full_name,
      lastName: inputData.last_name,
      email: inputData.email,
      password: await bcrypt.hash(inputData.password, 10),
    });
    res.redirect("/auth/login");
    return;
  }

  //GET Operation
  var actionUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  res.render("./auth/register", { title: "Register Page", actionUrl });
};

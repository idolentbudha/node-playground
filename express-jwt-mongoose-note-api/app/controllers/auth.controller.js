const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
  let newUser = new User(req.body);
  console.log(req.body);
  console.log("newUser", newUser);
  console.log("hashpassword", newUser.hash_password);
  newUser.hash_password = bcrypt.hashSync(req.body.hash_password);

  newUser.save((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    //   user.hash_password = undefined;
    res.status(201).json(user);
  });
  //   res.json({ done: "done" });
};

exports.signIn = (req, res) => {
  console.log("req", req.body);

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) res.status(500).json(err);
    if (!user) {
      res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    } else if (user) {
      console.log("user", user);
      console.log("compare", user.comparePassword(req.body.password));
      if (!user.comparePassword(req.body.password)) {
        res.status(400).json({
          message: "Authentication failed. Wrong Password.",
        });
      } else {
        res.json({
          token: jwt.sign(
            { email: user.email, fullName: user.fullName, _id: user._id },
            "Resfulapis"
          ),
        });
      }
    }
  });
};

// User Regiser function
exports.loginRequired = (req, res) => {
  if (req.user) {
    res.json({ message: "Authorized User, Action Successfull" });
  } else {
    res.status(401).json({ message: "Unauthorized user!" });
  }
};

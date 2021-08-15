const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

//create app

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); //parse request of content-type  application/x-www-form-urlencoded
app.use(bodyParser.json()); //parse request of Content-type json

const dbConfig = require("./config/database.config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

//connecting to database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Succesfully connected to database");
  })
  .catch((err) => {
    console.error("database connection error:", err);
    process.exit();
  });

/**
 * MIDDLEWARE
 */

app.use((req, res, next) => {
  console.log("jwt checker middleware");
  console.log(req.headers);
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    //verify jwt token
    console.log("verifying jwt");
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      "Resfulapis",
      (err, decode) => {
        req.user = err ? undefined : decode;
        next();
      }
    );
  } else {
    console.log("else jwt");
    req.user = undefined;
    next();
  }
});

/**
 * END POINTS
 *  */

//defining a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to  EasyNote Aplication" });
});

//Routes
require("./app/routes/note.route.js")(app);
require("./app/routes/auth.routes")(app);

app.listen(3000, () => {
  console.log("Server is listening to port 3000");
});

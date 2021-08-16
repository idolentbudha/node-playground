var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sessions = require("express-session");
// var sessionStore;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth.route.js");
const db = require("./models");

var SequelizeStore = require("connect-session-sequelize")(sessions.Store);

var app = express();

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    store: new SequelizeStore({
      db: db.sequelize,
      checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
      expiration: 24 * 60 * 60 * 1000, // The maximum age (in milliseconds) of a valid session.
    }),
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/app/login", (req, res) => {
  const actionUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

  res.render("slogin.ejs", {
    title: "Session Login Page",
    error_message: "",
    actionUrl,
  });
});

app.post("/app/login", (req, res) => {
  console.log("request:", req.session);
  sessionStore = req.session;
  sessionStore.email = req.body.email;
  console.log("email:", req.body.email);
  // console.log("sessionStore:", sessionStore);

  const actionUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

  res.render("slogin.ejs", {
    title: "Session POST Page",
    error_message: "",
    actionUrl,
  });
});

app.get("/app/home", (req, res) => {
  console.log("request:", req.session);
  // sessionStore = req.session;
  // sessionStore.email = req.body.email;
  // console.log("email:", req.body.email);
  console.log("sessionStore:", sessionStore);
  if (req.session.email) {
    res.send("<h1>Home</h1>");
    return;
  }
  const actionUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  res.send("<h1>Not Auth</h1>");
  return;
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

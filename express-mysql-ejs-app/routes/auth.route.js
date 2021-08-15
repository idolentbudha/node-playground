var express = require("express");
var router = express.Router();

var authController = require("../controllers/auth.controller.js");
/* GET home page. */
router.get("/login", authController.login);
router.post("/login", authController.login);

router.get("/register", authController.register);
router.post("/register", authController.register);

module.exports = router;

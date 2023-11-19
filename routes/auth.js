const express = require("express");
const authController = require("../controller/auth");

const router = express.Router();

router.post("/signUp", authController.createUser);

exports.router = router;

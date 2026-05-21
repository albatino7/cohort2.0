const express = require("express");
const {
  registerController,
  loginController,
} = require("../controller/auth.controller");
const authRoutes = express.Router();

authRoutes.post("/user/register", registerController);
authRoutes.post("/user/login", loginController);

module.exports = authRoutes;

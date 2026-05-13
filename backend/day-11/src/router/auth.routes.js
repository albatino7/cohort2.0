const express = require("express");
const {
  registerController,
  loginController,
} = require("../controller/user.controller");

const authRoutes = express.Router();

authRoutes.post("/auth/register", registerController);
authRoutes.post("/auth/login", loginController);

module.exports = authRoutes;

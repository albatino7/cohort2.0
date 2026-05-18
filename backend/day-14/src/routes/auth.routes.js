require("dotenv").config();
const express = require("express");
const {
  registerController,
  loginController,
} = require("../controller/auth.controller");

const authRouter = express.Router();

authRouter.post("/auth/register", registerController);
authRouter.post("/auth/login", loginController);

module.exports = authRouter;

const express = require("express");
const {
  registerController,
  loginController,
} = require("../controller/user.controller");

const authRouter = express.Router();

authRouter.post("/user/register", registerController);
authRouter.post("/user/login", loginController);

module.exports = authRouter;

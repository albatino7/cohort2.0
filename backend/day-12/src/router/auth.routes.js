const express = require("express");
const {
  resgiterController,
  loginController,
} = require("../controller/user.controller");

const authRouter = express.Router();

authRouter.post("/auth/register", resgiterController);
authRouter.post("/auth/login", loginController);

module.exports = authRouter;

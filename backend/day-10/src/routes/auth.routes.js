require("dotenv").config();
const express = require("express");
const userModel = require("../model/users.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const authRoute = express.Router();

authRoute.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(409).json({
      message: "User Already Exist",
    });
  }

  const hashPassword = await crypto
    .createHash("md5")
    .update(password)
    .digest("hex");

  const newUser = await userModel.create({
    name: name,
    email: email,
    password: hashPassword,
  });

  const token = jwt.sign(
    {
      id: newUser._id,
      email: newUser.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "user Created Sucessfully",
    newUser,
    token,
  });
});

authRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(409).json({
      message: "User Email Is Exist",
    });
  }

  const isPasswordMatched =
    user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!isPasswordMatched) {
    return res.status(409).json({
      message: "User Password iS not Correct ",
    });
  }

  const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET);

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User Login Sucessfully",
    user,
    token,
  });
});

authRoute.get("/user", async (req, res) => {
  const users = await userModel.find();
  res.status(200).json({
    message: "user Fetch Sucessfully",
    users,
  });
});

module.exports = authRoute;

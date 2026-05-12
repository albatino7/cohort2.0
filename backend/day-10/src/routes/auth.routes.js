require("dotenv").config();
const express = require("express");
const userModel = require("../model/users.model");
const jwt = require("jsonwebtoken");

const authRoute = express.Router();

authRoute.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });
  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "User Already Exist",
    });
  }

  const createdUser = await userModel.create({
    name: name,
    email: email,
    password: password,
  });

  const token = jwt.sign(
    {
      id: createdUser._id,
      email: createdUser.email,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "user Created Sucessfully",
    createdUser,
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

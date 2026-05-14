require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userModel = require("../model/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function resgiterController(req, res) {
  const { email, username, password, bio } = req.body;

  const user = await userModel.findOne({
    $or: [
      {
        email: email,
      },
      {
        username: username,
      },
    ],
  });

  if (user) {
    res.status(409).json({
      message: "user ise Already Exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 4);

  const newUser = await userModel.create({
    username: username,
    email: email,
    password: hashPassword,
  });

  const token = await jwt.sign(
    {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Craeted Sucessfully",
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  });
}

async function loginController(req, res) {
  const { email, username, password } = req.body;

  const user = await userModel.findOne({
    $or: [
      {
        email: email,
      },
      {
        username: username,
      },
    ],
  });

  if (!user) {
    return res.status(409).json({
      message: "User Not Found",
    });
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  const userpassword = user.password;
  console.log(checkPassword);
  if (!checkPassword) {
    return res.status(409).json({
      message: "Passsword is Invalid ",
    });
  }

  const token = await jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User LogIN Sucessfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

module.exports = { resgiterController, loginController };

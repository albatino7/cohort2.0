require("dotenv").config();
const mongoose = require("mongoose");
const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { username, email, password, bio } = req.body;

  const isUserExistByUserNameOrEmail = userModel.findOne({
    $or: [
      {
        email: email,
      },
      {
        username: username,
      },
    ],
  });

  if (!isUserExistByUserNameOrEmail) {
    return res.status(409).json({
      mesaage:
        "user Already EXist " +
        (isUserExistByUserNameOrEmail.username == username
          ? "Username IS EXIST "
          : "Email ALREADY eXIST"),
    });
  }

  const hashPassword = await crypto
    .createHash("md5")
    .update(password)
    .digest("hex");

  const user = await userModel.create({
    username: username,
    email: email,
    password: hashPassword,
    bio: bio,
  });

  const token = await jwt.sign(
    {
      user: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user Registered Sucessfully ",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      image: user.profileImage,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [
      {
        username: username,
      },
      {
        email: email,
      },
    ],
  });

  if (!user) {
    res.status(409).json({
      message: "user not found ",
    });
  }

  const passwordCheck =
    user.password ==
    (await crypto.createHash("md5").update(password).digest("hex"));

  if (!passwordCheck) {
    res.status(409).json({
      message: "User Password Is  Wrong",
    });
  }

  const token = await jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("token", token);
  res.status(200).json({
    mesaage: "User login Sucessfully ",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      image: user.profileImage,
    },
  });
}

module.exports = { registerController, loginController };

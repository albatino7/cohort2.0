require("dotenv").config();
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerController(req, res) {
  const { username, email, password, bio } = req.body;
  console.log(req.body);

  const user = await userModel.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (user) {
    return res.status(409).json({
      message: "User Already Exist ",
    });
  }

  const hash = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    username: username,
    email: email,
    password: hash,
    bio: bio,
  });

  const token = await jwt.sign(
    {
      id: newUser._id,
      username: newUser.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User Login Sucessfully",
    newUser,
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
    return res.status(409).json({
      message: "User Doesnot EXist ",
    });
  }

  const decoded = await bcrypt.compare(password, user.password);

  if (!decoded) {
    res.status(409).json({
      message: "Your password is Wrong",
    });
  }

  const token = await jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user Login Sucessfully",
    user,
  });
}

module.exports = { registerController, loginController };

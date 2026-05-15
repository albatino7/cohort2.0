const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { email, username, bio, password } = req.body;

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
    return res.status(409).json({
      mesaage:
        "user already exist with ::" +
        (username == user.username ? "email" : "username"),
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
      email: newUser.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    mesaage: "User Created Sucesffuly ",
    user: {
      id: newUser._id,
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
      message: "User not Found",
    });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(409).json({
      message: "User Password is Wrong",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user._email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User login Sucessfully",
    users: {
      id: user._id,
      email: user.email,
    },
  });
}

module.exports = { registerController, loginController };

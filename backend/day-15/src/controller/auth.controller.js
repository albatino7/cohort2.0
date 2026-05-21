const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { username, email, password, bio } = req.body;

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

  if (user) {
    return res.status(409).json({
      message: "user Already Exist",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const userCraeted = await userModel.create({
    username: username,
    email: email,
    password: hash,
    bio: bio,
  });

  const token = await jwt.sign(
    {
      id: userCraeted._id,
      email: userCraeted.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "userCraeted sucessfully",
    userCraeted,
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
      message: "User is not Existed",
    });
  }

  const decoded = await bcrypt.compare(password, user.password);

  if (!decoded) {
    return res.status(409).json({
      message: "user password is Wrong ",
    });
  }

  const token = await jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User LOGIN Sucessfully",
    user,
  });
}

module.exports = { registerController, loginController };

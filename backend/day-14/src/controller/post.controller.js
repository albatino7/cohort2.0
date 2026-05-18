require("dotenv").config();
const postModel = require("../model/post.model");
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ImagekitIo = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imageKitIo = new ImagekitIo({
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const { caption } = req.body;

  const userId = req.user.id;

  const user = await userModel.find({ _id: userId });
  // console.log(user);

  if (!user) {
    return res.status(409).json({
      message: "User not found is DataBase",
    });
  }

  const response = await imageKitIo.files.upload({
    file: await toFile(req.file.buffer),
    fileName: req.file.originalname,
  });

  const post = await postModel.create({
    caption: caption,
    user: userId,
    imageUrl: response.url,
  });

  res.status(201).json({
    message: "Post created Sucessfully",
    post,
  });
}

async function getpostController(req, res) {
  const decoded = req.user.id;

  const userId = decoded;

  const user = await userModel.findById({ _id: userId });

  if (!user) {
    return res.status(409).json({
      message: "User does not EXIST ",
    });
  }

  const post = await postModel.find({ user: user._id });

  if (!post) {
    return res.status(409).json({
      message: "user Dont have any post",
    });
  }

  res.status(200).json({
    message: "All post of user is fetched Sucessfully",
    post,
  });
}

async function getpostbyId(req, res) {
  const { postid } = req.params;
  const userID = req.user.id;

  const user = await userModel.findById({ _id: userID });
  if (!user) {
    return res.status(409).json({
      message: "User is Not FOund IN db",
    });
  }

  const post = await postModel.findById({ _id: postid });

  if (!post) {
    return res.status(409).json({
      message: "this Id HAS No Posts",
    });
  }

  const verify = user._id.toString() == post.user.toString();

  if (!verify) {
    return res.status(409).json({
      message: "This post is not belog this User",
    });
  }

  res.status(200).json({
    message: "feteched Data Sucessfully",
    post,
  });
}

module.exports = { createPostController, getpostController, getpostbyId };

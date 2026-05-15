require("dotenv").config();
const postModel = require("../model/post.model");
const jwt = require("jsonwebtoken");
const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imageKit = new Imagekit({
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const token = req.cookies.token;
  //   console.log(token);

  if (!token) {
    res.status(409).json({
      message: "Token is Expires ",
    });
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const respone = await imageKit.files.upload({
    file: await toFile(req.file.buffer),
    fileName: req.file.originalname,
  });

  const newPost = await postModel.create({
    caption: req.body.caption,
    imageUrl: respone.url,
    user: decoded.id,
  });

  res.status(201).json({
    message: "post is created Sucessffully",
    newPost,
  });
}

async function updatePostController(req, res) {}

module.exports = { createPostController, updatePostController };

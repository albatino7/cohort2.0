require("dotenv").config();
const postModel = require("../model/post.model");
const jwt = require("jsonwebtoken");
const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const userModel = require("../model/user.model");

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

async function getPostController(req, res) {
  const token = req.cookies.token;
  console.log(token);

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(409).json({
      message: "Token is not Valid",
    });
  }

  const userID = decoded.id;

  const posts = await postModel.find({
    user: userID,
  });

  res.status(200).json({
    message: "allpost fetched Sucessfully",
    posts,
  });
}

async function getPostByIdController(req, res) {
  const { postid } = req.body;
  const token = req.cookies.token;
  console.log(token);

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(409).json({
      message: "Token is not Valid ",
    });
  }

  console.log(decoded);

  const userID = decoded.id;

  const user = await userModel.findOne({ _id: userID });

  if (!user) {
    return res.status(409).json({
      message: "user is Not  Found",
    });
  }

  const posts = await postModel.findOne({ _id: postid });

  const verify = userID.toString() == posts.user.toString();

  if (!verify) {
    return res.status(409).json({
      message: "User id is not matched to post Id",
    });
  }

  res.status(201).json({
    message: "post Data is feteched Sucessfully",
    posts,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostByIdController,
};

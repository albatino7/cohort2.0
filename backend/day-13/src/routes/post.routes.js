const express = require("express");
const {
  createPostController,
  getPostController,
  getPostByIdController,
} = require("../controller/post.controller");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const postRouter = express.Router();

postRouter.post("/post/create", upload.single("image"), createPostController);
postRouter.get("/post/find", getPostController);
postRouter.get("/post/findOne", getPostByIdController);
module.exports = postRouter;

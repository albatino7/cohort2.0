const express = require("express");
const {
  createPostController,
  updatePostController,
} = require("../controller/post.controller");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const postRouter = express.Router();

postRouter.post("/post/create", upload.single("image"), createPostController);

module.exports = postRouter;

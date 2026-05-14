const express = require("express");

const postRouter = express.Router();
const {
  createPostController,
  updatePostController,
} = require("../controller/post.controller");

///

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/post/create", upload.single("image"), createPostController);

module.exports = postRouter;

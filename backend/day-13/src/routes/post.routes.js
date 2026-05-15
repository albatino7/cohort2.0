const express = require("express");
const {
  createPostController,
  getPostController,
  getPostByIdController,
} = require("../controller/post.controller");

const jwtMiddleware = require("../middleware/jwt.middleware");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const postRouter = express.Router();

postRouter.post(
  "/post/create",
  upload.single("image"),
  jwtMiddleware,
  createPostController,
);

postRouter.get("/post/find", jwtMiddleware, getPostController);

postRouter.get("/post/findone", jwtMiddleware, getPostByIdController);

module.exports = postRouter;

const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const {
  createPostController,
  getpostController,
  getpostbyId,
} = require("../controller/post.controller");
const authCheckMiddleWare = require("../middleware/auth.middleware");

const postRoute = express.Router();

postRoute.post(
  "/post/create",
  upload.single("image"),
  authCheckMiddleWare,
  createPostController,
);

postRoute.get("/post/all", authCheckMiddleWare, getpostController);
postRoute.get("/post/:postid", authCheckMiddleWare, getpostbyId);
module.exports = postRoute;

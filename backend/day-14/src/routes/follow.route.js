const express = require("express");
const authCheckMiddleWare = require("../middleware/auth.middleware");
const {
  followByUserIdController,
  acceptRequestController,
  unfollowUserController,
} = require("../controller/follow.controller");
const followRoute = express.Router();

followRoute.get(
  "/follow/:userid",
  authCheckMiddleWare,
  followByUserIdController,
);

followRoute.post(
  "/follow/accept",
  authCheckMiddleWare,
  acceptRequestController,
);

followRoute.post(
  "/follow/unfollow",
  authCheckMiddleWare,
  unfollowUserController,
);

module.exports = followRoute;

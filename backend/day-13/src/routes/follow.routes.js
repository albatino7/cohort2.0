const express = require("express");
const {
  followUserController,
  unfollowUserController,
  getFollowersController,
  getFollowingController,
} = require("../controller/follow.controller");

const jwtMiddleware = require("../middleware/jwt.middleware");

const followRouter = express.Router();

// Follow a user
followRouter.post("/follow", jwtMiddleware, followUserController);

// Unfollow a user
followRouter.post("/unfollow", jwtMiddleware, unfollowUserController);

// Get followers
followRouter.get("/followers/:userId", jwtMiddleware, getFollowersController);

// Get following
followRouter.get("/following/:userId", jwtMiddleware, getFollowingController);

module.exports = followRouter;

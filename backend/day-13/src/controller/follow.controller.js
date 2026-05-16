const followModel = require("../model/follow.model");
const userModel = require("../model/user.model");

// Follow a user
async function followUserController(req, res) {
  try {
    const { followeeId } = req.body;
    const followerId = req.user._id;

    if (!followeeId) {
      return res.status(400).json({
        message: "followeeId is required",
      });
    }

    if (followerId === followeeId) {
      return res.status(400).json({
        message: "Cannot follow yourself",
      });
    }

    const existingFollow = await followModel.findOne({
      follower: followerId,
      followee: followeeId,
    });

    if (existingFollow) {
      return res.status(400).json({
        message: "Already following this user",
      });
    }

    const newFollow = new followModel({
      follower: followerId,
      followee: followeeId,
    });

    await newFollow.save();

    res.status(201).json({
      message: "User followed successfully",
      data: newFollow,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// Unfollow a user
async function unfollowUserController(req, res) {
  try {
    const { followeeId } = req.body;
    const followerId = req.user._id;

    const result = await followModel.findOneAndDelete({
      follower: followerId,
      followee: followeeId,
    });

    if (!result) {
      return res.status(404).json({
        message: "Follow record not found",
      });
    }

    res.status(200).json({
      message: "User unfollowed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// Get followers
async function getFollowersController(req, res) {
  try {
    const { userId } = req.params;

    const followers = await followModel
      .find({ followee: userId })
      .populate("follower", "username email bio");

    res.status(200).json({
      message: "Followers fetched successfully",
      data: followers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// Get following
async function getFollowingController(req, res) {
  try {
    const { userId } = req.params;

    const following = await followModel
      .find({ follower: userId })
      .populate("followee", "username email bio");

    res.status(200).json({
      message: "Following fetched successfully",
      data: following,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  followUserController,
  unfollowUserController,
  getFollowersController,
  getFollowingController,
};

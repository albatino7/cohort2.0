const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      requried: true,
    },
    followee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      requried: true,
    },
  },
  {
    timestamps: true,
  },
);

const followModel = mongoose.model("follows", followSchema);
module.exports = followModel;

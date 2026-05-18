const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "follower ID is Required"],
    },
    followee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Followee Id is Required"],
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

followerSchema.index({ follower: 1, followee: 1 }, { unique: true });

const followModel = mongoose.model("follwers", followerSchema);

module.exports = followModel;

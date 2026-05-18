const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: [true, "Caption is required "],
  },
  imageUrl: {
    type: String,
    required: [true, "image url is Required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User id is Required"],
  },
});

const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;

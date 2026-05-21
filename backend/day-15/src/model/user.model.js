const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    requried: [true, "User name is Required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email Is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;

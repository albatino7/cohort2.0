const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "user name is Required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required True"],
  },
  bio: {
    type: String,
    default: "",
  },
  acctype: {
    type: String,
    enum: ["private", "public"],
    default: "private",
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;

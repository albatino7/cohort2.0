const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "User Name Already Exist "],
    required: true,
  },
  email: {
    type: String,
    unique: [true, "Email Already Exists"],
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  bio: String,
  profileImage: {
    type: String,
    default: "xyz",
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;

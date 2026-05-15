const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "user name does not exist"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, " user email doesnot esist"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
  },
  bio: {
    type: String,
    default: "",
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;

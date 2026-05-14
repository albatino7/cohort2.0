const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "This User aname Already Exist"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "This Email Is Already EXists "],
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  profileImage: {
    type: String,
    default: "xyz",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;

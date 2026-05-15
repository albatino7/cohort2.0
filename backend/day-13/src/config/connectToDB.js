require("dotenv").config();
const mongoose = require("mongoose");

async function connectToDB() {
  mongoose.connect(process.env.DB_URI);
  console.log("connected TO DB");
}

module.exports = connectToDB;

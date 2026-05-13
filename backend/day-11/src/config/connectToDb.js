const mongoose = require("mongoose");

async function connectToDb() {
  await mongoose.connect(process.env.DB_URI);

  console.log("Connected To DB");
}

module.exports = connectToDb;

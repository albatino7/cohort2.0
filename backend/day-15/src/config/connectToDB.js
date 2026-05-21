const mongoose = require("mongoose");

async function connectToDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("We are Connected To DB Sucessfully");
}

module.exports = connectToDB;

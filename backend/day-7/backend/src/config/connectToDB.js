const mongoose = require("mongoose");

const ConnectToDB = () => {
  try {
    mongoose
      .connect(process.env.DATABASE_URL + process.env.DATABASE_NAME)
      .then(console.log("Best Is connected to DB"));
  } catch (error) {
    console.log("connect to DBtoConnect is Not Wroking", error);
  }
};

module.exports = ConnectToDB;

const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL + process.env.DATABASE_NAME)
    .then(() => {
      console.log("Beast is Connected to Database");
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = connectToDB;

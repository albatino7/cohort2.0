const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL + process.env.DATABASE_NAME)
    .then(() => {
      console.log("Beast is Connected To Database");
    })
    .catch((e) => {
      console.log("Unable to Connect TO Database");
    });
};

module.exports = connectToDB;

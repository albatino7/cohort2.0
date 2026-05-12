const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("connected To Db sucessfully");
    })
    .catch((e) => {
      console.log("unable to Connect To Db");
    });
};

module.exports = connectToDB;

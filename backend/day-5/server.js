const app = require("./src/app");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE_URL + "/" + process.env.DATABASE_NAME)
  .then(() => {
    console.log("Server is Connected To DATABAE");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(process.env.PORT, () => {
  console.log("Server is Running on port ::" + process.env.PORT);
});

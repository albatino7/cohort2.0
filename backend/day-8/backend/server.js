require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/connectToDB");

connectToDB();

app.listen(process.env.PORT, () => {
  console.log("Beast is Running on PORT ::  " + process.env.PORT);
});

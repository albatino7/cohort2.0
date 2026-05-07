const app = require("./src/app");
const connectToDB = require("./src/config/connectToDB");
require("dotenv").config();

connectToDB();

app.listen(process.env.PORT, () => {
  console.log("Beast is Running on Port ::" + process.env.PORT);
});

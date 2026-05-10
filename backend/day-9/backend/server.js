require("dotenv").config();

const app = require("./src/app");
const connectToDb = require("./src/config/connectToDb");

connectToDb();

app.listen(process.env.PORT, () => {
  console.log("Beast is Running on :: " + process.env.PORT);
});

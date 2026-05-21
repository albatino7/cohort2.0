require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/connectToDB");

connectToDB();

app.listen(process.env.PORT, () => {
  console.log("Your Server Is Running On Port " + process.env.PORT);
});

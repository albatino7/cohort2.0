require("dotenv").config();
const connectToDB = require("./src/config/connectToDB");
const app = require("./src/app");

connectToDB();

app.listen(process.env.PORT, () => {
  console.log("Server is Running on PORT ::: " + process.env.PORT);
});

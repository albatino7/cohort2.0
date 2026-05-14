require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/connectToDB");

connectToDB();

app.listen(process.env.PORT, () => {
  console.log("server is runing at PORT ::" + process.env.PORT);
});

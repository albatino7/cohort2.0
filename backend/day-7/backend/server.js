//starting server

require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/connectToDB");

connectToDB();

app.listen(process.env.PORT, () => {
  console.log("Beast Is running on Port :: " + process.env.PORT);
});

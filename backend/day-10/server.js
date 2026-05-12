const app = require("./src/app");
const connectToDB = require("./src/config/connectToDB");

connectToDB();

app.listen(process.env.PORT, () => {
  console.log("Sever is Running is port :: " + process.env.PORT);
});

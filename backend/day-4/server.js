const app = require("./src/app");
require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log("Beast Is Runnning On :: " + process.env.PORT);
});

const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json()); //for reading data of req.body

const user = [];

//public pages
app.get("/", (req, res) => {
  res.send("This is Homme Page");
});

app.get("/home", (req, res) => {
  res.redirect("/");
});

app.get("/about", (req, res) => {
  res.send("This is About Page");
});

// authorized Pages
app.post("/register", (req, res) => {
  const newUser = req.body;
  user.push(newUser);

  res.send("User Created Sucessfully");
});

app.get("/users", (req, res) => {
  res.send(user);
});
// server is Runnig

app.listen(process.env.PORT, () => {
  console.log("Sever is Running on :: " + process.env.PORT);
});

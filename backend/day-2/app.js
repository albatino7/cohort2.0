const express = require("express");
require("dotenv").config();

//creating Server-----------------------
const app = express();

//Rotes----------------------

app.get("/", (req, res) => {
  res.send("You are on Home Page");
});

app.get("/home", (req, res) => {
  res.redirect("/");
});

app.get("/about", (req, res) => {
  res.send("You are on about Page");
});

//Server is Runing on Port --------------------

app.listen(process.env.PORT, () => {
  console.log("Server Is Ready");
});

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("This is home Page");
});

app.get("/home", (req, res) => {
  res.redirect("/");
});

app.get("/product", (req, res) => {
  res.send("This is Product page");
});

app.get("/about", (req, res) => {
  res.send("This is About Page");
});

app.listen(3000, () => {
  console.log("Beast is Ready");
});

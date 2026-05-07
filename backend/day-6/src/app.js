const express = require("express");
const app = express();
const noteModel = require("./model/notes.model");
app.use(express.json());

app.post("/notes/create", async (req, res) => {
  const { name, email } = req.body;
  const note = await noteModel.create({
    name: name,
    email: email,
  });

  res.status(201).json({ message: "Data is created in model ", note });
});

app.get("/notes", async (req, res) => {
  const note = await noteModel.find();

  res.status(200).json({
    message: "Get is Working Good",
    note,
  });
});

module.exports = app;

//creating server

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const noteModel = require("./model/notes.model");

const app = express();
app.use(express.json());
app.use(cors());

//create operation in DB
app.post("/note/create", async (req, res) => {
  const { name, email, city } = req.body;
  const note = await noteModel.create({
    name: name,
    email: email,
    city: city,
  });

  res.status(200).json({
    message: "DATA IS INJECTED ",
    note,
  });
});

//Read data get

app.get("/note", async (req, res) => {
  const note = await noteModel.find();

  res.status(200).json({
    message: "Data is fetched",
    note,
  });
});

//updateData

app.patch("/note/update", async (req, res) => {
  const { id, city } = req.body;

  const note = await noteModel.findByIdAndUpdate(id, { city: city });

  res.status(200).json({
    message: "Updation is Sucessfull",
    note,
  });
});

//Delete Data
app.delete("/note/delete", async (req, res) => {
  const { id } = req.body;
  const note = await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "File Deleted SucessfullY",
    note,
  });
});

module.exports = app;

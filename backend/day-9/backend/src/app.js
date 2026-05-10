const express = require("express");
const mongoose = require("mongoose");
const notesModel = require("./model/notes.model");
const cors = require("cors");
const path = require("path")

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./public"))

app.get("/notes", async (req, res) => {
  const notes = await notesModel.find();

  res.status(200).json({ mesaage: "DATA is getting sucessfull", notes });
});

app.post("/notes/create", async (req, res) => {
  const { name, email, city } = req.body;

  const createdNotes = await notesModel.create({
    name: name,
    email: email,
    city: city,
  });
  res.status(200).json({ mesaage: "Data is created in Db", createdNotes });
});

app.patch("/notes/update", async (req, res) => {
  const { id, email, name, city } = req.body;

  const updatedNotes = await notesModel.findByIdAndUpdate(id, {
    name: name,
    email: email,
    city: city,
  });

  res.status(200).json({ message: "Data is Updated ", updatedNotes });
});

app.delete("/notes/delete", async (req, res) => {
  const { id } = req.body;
  const notesDeleted = await notesModel.findByIdAndDelete(id);
  res
    .status(200)
    .json({ message: "Data is Deleted Sucessfully" }, notesDeleted);
});

module.exports = app;

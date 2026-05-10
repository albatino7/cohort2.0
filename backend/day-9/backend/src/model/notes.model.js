const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: String,
});

const notesModel = mongoose.model("notes", noteSchema);

module.exports = notesModel;

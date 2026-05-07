const express = require("express");
require("dotenv").config();

console.log(process.env.PORT);
const app = express();
app.use(express.json());

//Hard Data

let note = [
  { id: "1", title: "Atul Demond", email: "atuldemond@gmail.com" },
  { id: "2", title: "MsDhoni ", email: "ms@gmail.com" },
];

//notes curd
app.get("/notes", (req, res) => {
  res.send(note);
});

app.post("/notes/create", (req, res) => {
  const newNotes = req.body;
  note.push(newNotes);

  res.send("Your Notes is Created Sucessfully");
});

app.patch("/notes/update", (req, res) => {
  const { id, name, email } = req.body;
  console.log(id);
  console.log(name);
  console.log(email);

  note.map((value, index) => {
    if (value.id == id) {
      value.name = name;
      value.email = email;
    }
  });

  //   const userNote = note.find((value) => value.id == id);

  //   userNote.name = name;
  //   userNote.title = title;

  res.send("user update sucessfully");
});

//update thorugh useprams

app.patch("/notes/:index", (req, res) => {
  console.log(req.body.email);
  note[req.params.index].email = req.body.email;

  res.send("email is updated sucessfully");
});

app.delete("/notes/delete", (req, res) => {
  const { id } = req.body;
  note = note.filter((value, index) => {
    return value.id !== id;
  });

  res.send(note);
});

module.exports = app;

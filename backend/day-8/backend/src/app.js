require("dotenv").config();
const express = require("express");
const noteModel = require("./model/notes.model");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(express.json());
app.use(cors());
app.use(express.static("./src/public"));

//creating routes ::----

/*
creating note 
*/
app.post("/note/create", async (req, res) => {
  try {
    const { name, email, city } = req.body;

    const notes = await noteModel.create({
      name: name,
      email: email,
      city: city,
    });

    res.status(200).json({
      message: "Data injected to DB",
      notes,
    });
  } catch (error) {
    res.status(401).json({
      message: "Unable to  create new Notes in DB",
      notes,
    });
  }
});

//reading notes
app.get("/note", async (req, res) => {
  try {
    const notes = await noteModel.find();
    res.status(200).json({
      message: "Data Fetched Successfull",
      notes,
    });
  } catch (error) {
    console.log("Error in GET /note:", error);
    res.status(401).json({
      message: "getting error in Data fetching ",
      error: error.message,
    });
  }
});

//updating notes

app.patch("/note/update", async (req, res) => {
  try {
    const { id, name, email, city } = req.body;
    console.log(req.body);
    const notes = await noteModel.findByIdAndUpdate(id, {
      name: name,
      email: email,
      city: city,
    });

    res.status(200).json({
      mesaage: "data is updated sucessfully",
      notes,
    });
  } catch (error) {
    res.status(401).json({
      message: "Unable to update data",
      notes,
    });
  }
});

//deleting notes

app.delete("/note/delete", async (req, res) => {
  try {
    const { id } = req.body;
    const notes = await noteModel.findByIdAndDelete(id);
    res.status(200).json({
      mesaage: "Notes is Delted Sucessfully",
      notes,
    });
  } catch (error) {
    res.status(401).json({
      mesaage: "Data is not Deleted Yet",
      notes,
    });
  }
});

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;

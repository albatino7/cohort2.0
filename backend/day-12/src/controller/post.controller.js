require("dotenv").config();
const mongoose = require("mongoose");

const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imageKit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
});

async function createPostController(req, res) {
  console.log(req.body, req.file);

  const response = await imageKit.files.upload({
    file: await toFile(req.file.buffer),
    fileName: req.file.originalname,
  });

  res.status(200).json({
    message: "Uplaod sucessfully",
    response,
  });
}
async function updatePostController(req, res) {
  res.send("update post ");
}

module.exports = { createPostController, updatePostController };

require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("../src/routes/auth.routes");
const postRoute = require("../src/routes/post.route");
const followRoute = require("./routes/follow.route");

app.use("/api", authRouter);
app.use("/api", postRoute);
app.use("/api", followRoute);

module.exports = app;

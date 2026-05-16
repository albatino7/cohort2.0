require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

//Routes
const authRouter = require("./routes/auth.routes");
const postRouter = require("../src/routes/post.routes");
const followRouter = require("./routes/follow.routes");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api", postRouter);
app.use("/api", followRouter);

module.exports = app;

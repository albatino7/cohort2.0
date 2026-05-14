const express = require("express");
const cookieParser = require("cookie-parser");

// ROUTES
const authRouter = require("./router/auth.routes");

const postRouter = require("./router/post.routes");

///
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api", postRouter);

module.exports = app;

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require("./router/auth.routes");

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);

module.exports = app;

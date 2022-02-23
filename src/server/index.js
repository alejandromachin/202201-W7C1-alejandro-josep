require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

app.use(notFoundError);
app.use(generalError);

module.exports = app;

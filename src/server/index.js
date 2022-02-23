require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const { notFoundError, generalError } = require("./middlewares/errors");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

app.use(notFoundError);
app.use(generalError);

module.exports = app;

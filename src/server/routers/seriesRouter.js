const express = require("express");

const getAllSeries = require("../controllers/seriesControllers");

const seriesRouter = express.Router();

seriesRouter.get("/", getAllSeries);

module.exports = seriesRouter;

const express = require("express");

const {
  getAllSeries,
  getViewedSeries,
} = require("../controllers/seriesControllers");

const seriesRouter = express.Router();

seriesRouter.get("/", getAllSeries);
seriesRouter.get("/viewed", getViewedSeries);

module.exports = seriesRouter;

const express = require("express");

const {
  getAllSeries,
  getViewedSeries,
} = require("../controllers/seriesControllers");
const adminValidation = require("../middlewares/adminValidation");

const seriesRouter = express.Router();

seriesRouter.get("/", getAllSeries);
seriesRouter.get("/viewed", adminValidation, getViewedSeries);

module.exports = seriesRouter;

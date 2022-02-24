const express = require("express");
const {
  getAllSeries,
  getViewedSeries,
  postSerie,
} = require("../controllers/seriesControllers");
const adminValidation = require("../middlewares/adminValidation");

const seriesRouter = express.Router();

seriesRouter.get("/", getAllSeries);
seriesRouter.get("/viewed", adminValidation, getViewedSeries);
seriesRouter.post("/", adminValidation, postSerie);

module.exports = seriesRouter;

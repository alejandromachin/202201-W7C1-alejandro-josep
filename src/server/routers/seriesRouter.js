const express = require("express");
const adminValidation = require("../middlewares/adminValidation");

const {
  getAllSeries,
  getViewedSeries,
  postSerie,
} = require("../controllers/seriesControllers");

const seriesRouter = express.Router();

seriesRouter.get("/", getAllSeries);
seriesRouter.get("/viewed", adminValidation, getViewedSeries);
seriesRouter.post("/", adminValidation, postSerie);

module.exports = seriesRouter;

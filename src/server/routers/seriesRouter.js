const express = require("express");
const {
  getAllSeries,
  getViewedSeries,
  postSerie,
  deleteSerie,
} = require("../controllers/seriesControllers");
const adminValidation = require("../middlewares/adminValidation");

const seriesRouter = express.Router();

seriesRouter.get("/", getAllSeries);
seriesRouter.get("/viewed", getViewedSeries);
seriesRouter.post("/", adminValidation, postSerie);
seriesRouter.delete("/:idSerie", adminValidation, deleteSerie);

module.exports = seriesRouter;

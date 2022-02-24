const express = require("express");

const {
  getAllSeries,
  getViewedSeries,
  postSerie,
} = require("../controllers/seriesControllers");

const seriesRouter = express.Router();

seriesRouter.get("/", getAllSeries);
seriesRouter.get("/viewed", getViewedSeries);
// seriesRouter.get("/pending", getPendingSeries);
seriesRouter.post("/", postSerie);
// seriesRouter.put("/:idSerie", putSerie);
// seriesRouter.delete("/:idSerie", deleteSerie);
// seriesRouter.patch("/view/:idSerie", matchSerie);

module.exports = seriesRouter;

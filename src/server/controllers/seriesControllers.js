const Serie = require("../../database/models/Serie");
const User = require("../../database/models/User");

const getAllSeries = async (req, res) => {
  const series = await Serie.find();
  res.json({ series });
};

const getViewedSeries = async (req, res) => {
  const { id } = req.id;
  const series = await User.find({ id });
  res.json(series);
};

const postSerie = async (req, res, next) => {
  try {
    const serie = req.body;
    const newSerie = await Serie.create(serie);
    res.status(201).json(newSerie);
  } catch (error) {
    next(error);
  }
};

const deleteSerie = async (req, res, next) => {
  const { idSerie } = req.params;

  const deletedSerie = await Serie.findByIdAndDelete(idSerie);

  if (!deletedSerie) {
    const error = new Error(
      "Sorry, couldn't find the serie you want to delete"
    );
    next(error);
  } else {
    res.status(200).json(deletedSerie);
  }
};

module.exports = { getAllSeries, getViewedSeries, postSerie, deleteSerie };

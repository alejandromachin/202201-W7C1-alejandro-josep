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

module.exports = { getAllSeries, getViewedSeries, postSerie };

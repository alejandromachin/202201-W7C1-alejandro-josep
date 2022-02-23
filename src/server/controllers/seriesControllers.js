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

module.exports = { getAllSeries, getViewedSeries };

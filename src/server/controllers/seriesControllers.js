const Serie = require("../../database/models/Serie");

const getAllSeries = async (req, res) => {
  const series = await Serie.find();
  res.json({ series });
};

module.exports = getAllSeries;

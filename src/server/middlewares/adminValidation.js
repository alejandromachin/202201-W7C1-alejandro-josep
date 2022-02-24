const User = require("../../database/models/User");

const adminValidation = async (req, res, next) => {
  const { id } = req.body;
  const user = await User.findOne({ id });

  if (user.admin) {
    next();
  } else {
    const error = new Error("Sorry, you don't have privilegies to do this");
    error.code = 403;
    next(error);
  }
};

module.exports = adminValidation;

require("dotenv").config();

const jsonwebtoken = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const headerAuth = req.header("Authorization");
  if (typeof headerAuth !== "undefined") {
    const tokenId = headerAuth.split(" ")[1];

    if (typeof tokenId !== "undefined") {
      const validatedUser = await jsonwebtoken.verify(
        tokenId,
        process.env.SECRET
      );
      req.id = validatedUser.id;

      if (!validatedUser) {
        const newError = new Error("You are not authorized");
        newError.code = 401;
        next(newError);
        return;
      }
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    const newError = new Error("Token missing");
    newError.code = 401;
    next(newError);
  }
};

module.exports = verifyToken;

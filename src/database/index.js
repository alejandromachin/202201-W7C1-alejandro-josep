const debug = require("debug")("series:db");
const mongoose = require("mongoose");

const connectToDataBase = (connectionString) =>
  new Promise((resolve, reject) => {
    mongoose.connect(connectionString, (error) => {
      if (error) {
        reject(new Error(`You can't connect to a database: ${error.message}`));
        return;
      }
      debug("You're connected to a database");
      resolve();
    });
  });

module.exports = connectToDataBase;

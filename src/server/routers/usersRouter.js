require("dotenv").config();
const express = require("express");
const login = require("../controllers/usersController");

const router = express.Router();

router.post("/login", login);

module.exports = router;

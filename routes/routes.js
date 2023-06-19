const express = require("express");
const router = express.Router();
const weatherController = require("../controller/weather");

router.get("/weather", weatherController.getWeather);

module.exports = router;


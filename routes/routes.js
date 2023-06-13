const express = require("express");
const router = express.Router();
const weatherController = require("../controller/weather");
const searchCity = require("../controller/searchCities");

router.get("/weather", weatherController.getWeather);
router.get("/search", searchCity.searchCities);

module.exports = router;


const express = require("express");
const router = express.Router();
const searchCity = require("../controller/searchCities");

router.get("/search", searchCity.searchCities);

module.exports = router;
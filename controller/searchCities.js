const axios = require("axios");
// Importing dotenv module for loading environment variables from .env file
require("dotenv").config();

const API_KEY = process.env.API_KEY;

exports.searchCities = (req, res) => {
    const searchTerm = req.query.searchTerm;
    //url for search cities
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${API_KEY}`;

    axios
        .get(url)
        .then((response) => {
            const cities = response.data.map((city) => city.name);
            res.json({ cities });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Error searching cities" });
        });
};
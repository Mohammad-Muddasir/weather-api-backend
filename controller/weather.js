// Importing axios module for making HTTP requests
const axios = require("axios");
// Importing chalk module for colorizing console output
const chalk = require("chalk");
// Importing dotenv module for loading environment variables from .env file
require("dotenv").config();

// Getting API key from environment variables
const API_KEY = process.env.API_KEY;

// Controller function for getting weather data for a city
exports.getWeather = (req, res) => {
    // Getting city name from query parameter
    const city = req.query.city;
    // Building URL for weather API request
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    // Making API requests using axios module
    axios
        .all([axios.get(url), axios.get(forecastUrl)])
        .then(
            axios.spread((...responses) => {
                const currentWeatherResponse = responses[0];
                const forecastResponse = responses[1];

                // Parsing weather data from API response
                const weather = currentWeatherResponse.data.weather[0];
                // Printing weather report to console using chalk module
                console.log(chalk.green(`Weather for ${city}:`));
                const temperature = currentWeatherResponse.data.main.temp;
                console.log(chalk.yellow(`Temperature: ${temperature}°C`));
                const humidity = currentWeatherResponse.data.main.humidity;
                console.log(chalk.yellow(`Humidity: ${humidity}%`));
                const windSpeed = currentWeatherResponse.data.wind.speed;
                console.log(chalk.yellow(`Wind speed: ${windSpeed} m/s`));
                const sunrise = new Date(
                    currentWeatherResponse.data.sys.sunrise * 1000
                ).toLocaleTimeString();
                const sunset = new Date(
                    currentWeatherResponse.data.sys.sunset * 1000
                ).toLocaleTimeString();
                const forecast = forecastResponse.data.list;

                // Sending weather data as JSON response to client
                res.json({
                    city,
                    weather: weather.description,
                    temperature,
                    humidity,
                    windSpeed,
                    sunrise,
                    sunset,
                    forecast,
                });
            })
        )
        .catch((error) => {
            // Handling errors from API request
            if (error.response) {
                res.status(400).json({ error: error.response.data.message });
            } else if (error.request) {
                res.status(500).json({ error: "Unable to connect to weather service" });
            } else {
                res.status(500).json({ error: error.message });
            }
        });
};



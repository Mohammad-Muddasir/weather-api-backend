const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const weatherRouter = require("./routes/routes")
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.use("/api/v2", weatherRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

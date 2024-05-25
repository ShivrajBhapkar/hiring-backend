require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const httpStatus = require("http-status");
const cors = require("cors");
const connectDB = require("./db");
const router = require("./routes/v1");
const port = process.env.port || 8000;
const app = express();

// Connect to MongoDB
connectDB();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());

// Routes
app.use("/api/v1", router);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

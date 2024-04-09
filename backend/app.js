const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const morgan = require("morgan");
const cors = require("cors");
const port = process.env.PORT || 4000;


const config = require("./config/config.js");
const mongoString = process.env.MONGO_DATABASE_URL;

// import routes
const inventoryRouter = require("./routes/inventory");

const userRouter = require("./routes/user");



// connectMongoDB
mongoose.connect(mongoString);
const database = mongoose.connection;

// if MongoDB has an error connecting
database.on('error', (error) => {
  console.log(error);
});

// if MongoDB connects successfully.
database.once('connected', () => {
  console.log('Database Connected');
});

// instantiate express app
const app = express();

// Middleware

// body parser
app.use(express.json());

// logger
app.use(morgan("dev"));

// cors
app.use(cors(origins = "*"));

// home route
app.get("/", (req, res) => {
  res.send("Welcome to the Collection Mangement application backend!");
});

app.get("/api/v1", (req, res) => {
  res.send("Default api v1 route");
});

// inventory route
app.use("/api/v1/inventory", inventoryRouter);

// user routes
app.use("/api/v1/users", userRouter);

//server
app.listen(port, () => {
  console.log(`Inventory/Collection Management app listening at ${config.url.API_URL}:${port}`);
});

module.exports = app;
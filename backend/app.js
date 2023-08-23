const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


const morgan = require("morgan");
const cors = require("cors");
const port = process.env.PORT || 4000;

//load env variables
dotenv.config({ path: "./config/config.env" });
const mongoString = process.env.MONGO_DATABASE_URL;



// import routes
const inventoryRouter = require("./routes/inventory");
const authRouter = require("./routes/authentication");

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
app.use(cors());

// home route
app.get("/", (req, res) => {
  res.send("Welcome to the Collection Mangement application backend!");
});

// inventory route
app.use("/api/v1/inventory", inventoryRouter);

// authentication routes
app.use("/api/v1/auth", authRouter);

//server
app.listen(port, () => {
  console.log(`Inventory/Collection Management app listening at http://localhost:${port}`);
});

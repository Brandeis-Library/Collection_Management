const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const port = process.env.PORT || 4000;

//load env variables
dotenv.config({ path: "./config/config.env" });

// import routes
const inventoryRouter = require("./routes/inventory");

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

// create routes
app.use("/api/v1/inventory", inventoryRouter);

//server
app.listen(port, () => {
  console.log(`Inventory/Collection Management app listening at http://localhost:${port}`);
});

// mongoose.connect(
//   `mongodb+srv://${process.env.MONGODB_NAME}:${process.env.MONGODB_PASSWORD}@cluster0.flkwc.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) => {
//     if (err) {
//       console.error("FAILED TO CONNECT TO MONGODB");
//       console.error(err);
//     } else {
//       console.log("CONNECTED TO MONGODB!!");
//       app.listen(port, () => {
//         console.log(`Inventory/Collection Management app listening at http://localhost:${port}`);
//       });
//     }
//   },
// );

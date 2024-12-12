require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const workoutRouter = require("./Backend/router/workoutRouter");
const mongoDB = process.env.DB_URI;

mongoose.connect(mongoDB);
console.log("Successfully connected to workoutDB!");

app.use(express.json()); // middleware to accept json request bodies
app.use(cors()); // allows requests from cross-origin (not same origin)

app.use("/workout", workoutRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const workOutModel = mongoose.model("workout", workoutSchema);

module.exports = workOutModel;

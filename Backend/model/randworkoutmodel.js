const mongoose = require("mongoose");

const workOutschema = new mongoose.Schema({
  workout: String,
});

const workOutModel = mongoose.model("workout", workOutschema);

module.exports = workOutModel;

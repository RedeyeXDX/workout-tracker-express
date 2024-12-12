const { model } = require("mongoose");
const workOutModel = require("../../model/randworkoutmodel");

const getThreeWorkout = async (req, res) => {
  try {
    const randWorkout = await workOutModel.aggregate([
      { $sample: { size: 3 } },
    ]);
    res.json(randWorkout);
  } catch (error) {
    res.status(500).json(console.log(error));
  }
};

module.exports = {
  getThreeWorkout,
};

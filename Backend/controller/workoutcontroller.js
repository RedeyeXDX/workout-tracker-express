const { model } = require("mongoose");
const workOutModel = require("../model/workoutmodel");

const getTodayWorkout = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const workouts = await workOutModel.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (workouts.length === 0) {
      return res.status(200).json({ message: "No workouts found for today." });
    }

    res.status(200).json({ workouts });
  } catch (error) {
    console.error("Error fetching today's workouts:", error);
    res.status(500).json({ message: "Failed to fetch workouts." });
  }
};
const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Workout ID is required" });

    const deletedWorkout = await workOutModel.findByIdAndDelete(id);
    if (!deletedWorkout)
      return res.status(404).json({ error: "Workout not found" });

    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error("Error deleting workout:", error);
    res.status(500).json({ error: "Failed to delete workout" });
  }
};

const createWorkout = async (req, res) => {
  try {
    const { name, duration, caloriesBurned } = req.body;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingWorkout = await workOutModel.findOne({
      name,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (existingWorkout) {
      return res
        .status(400)
        .json({ message: "Workout for today already exists!" });
    }

    const workout = new workOutModel({
      name,
      duration,
      caloriesBurned,
      date: new Date(),
    });

    await workout.save();
    res.status(201).json({ message: "Workout added successfully!", workout });
    console.log("Workout saved successfully!");
  } catch (error) {
    console.error("Error adding workout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getallWorkout = async (req, res) => {
  try {
    const workouts = await workOutModel.find();
    res.status(200).json(workouts);
  } catch (err) {
    console.log(err);
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json("Invalid Request");

  const { name, duration, caloriesBurned } = req.body;
  const workout = {
    ...(name && { name }),
    ...(duration && { duration }),
    ...(caloriesBurned && { caloriesBurned }),
  };
  const updatedWorkout = await workOutModel.findByIdAndUpdate(id, workout, {
    new: true,
  });

  console.log(updatedWorkout);

  if (!updatedWorkout) return res.status(400).json("Todo not found");

  res.json(updatedWorkout);
};

module.exports = {
  getTodayWorkout,
  deleteOne,
  createWorkout,
  getallWorkout,
  updateWorkout,
};

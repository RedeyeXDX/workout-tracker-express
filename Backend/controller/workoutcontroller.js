const { model } = require("mongoose");
const workOutModel = require("../model/workoutmodel");

let lastSaveDate = null;
let lastSaveWorkout = [];

const getTodayWorkout = async (req, res) => {
  try {
    // Calculate the start and end of today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Query for all workouts within today's date range
    const workouts = await workOutModel.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    // If no workouts are found, return a friendly message
    if (workouts.length === 0) {
      return res.status(200).json({ message: "No workouts found for today." });
    }

    // Return all workouts for today
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

    const deletedWorkout = await workOutModel.findByIdAndDelete(id); // Deletes from the database
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
module.exports = {
  getTodayWorkout,
  deleteOne,
  createWorkout,
};

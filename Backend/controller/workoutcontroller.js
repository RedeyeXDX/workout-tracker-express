const { model } = require("mongoose");
const workOutModel = require("../model/workoutmodel");
const Loginmodel = require("../model/Loginmodel");

// get user today workout only
const getTodayWorkout = async (req, res) => {
  try {
    const { user } = req.body;

    const loginUser = await Loginmodel.findOne({ email: user });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const workouts = await workOutModel.find({
      user: loginUser._id,
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

//delete one workout from user
const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body;
    if (!id) return res.status(400).json({ error: "Workout ID is required" });

    const deletedWorkout = await workOutModel.findByIdAndDelete({
      _id: id,
      user: userId,
    });
    if (!deletedWorkout)
      return res.status(404).json({ error: "Workout not found" });

    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error("Error deleting workout:", error);
    res.status(500).json({ error: "Failed to delete workout" });
  }
};

//create a workout
const createWorkout = async (req, res) => {
  try {
    const { name, duration, caloriesBurned, user } = req.body;

    const loginUser = await Loginmodel.findOne({ email: user });
    if (!loginUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingWorkout = await workOutModel.findOne({
      user: loginUser._id,
      name,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (existingWorkout) {
      return res
        .status(400)
        .json({ message: "Workout for today already exists!" });
    }

    const workout = new workOutModel({
      user: loginUser._id,
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

//find all the workout for the user
const getallWorkout = async (req, res) => {
  try {
    const { user } = req.body;
    const loginUser = await Loginmodel.findOne({ email: user });
    if (!loginUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const workouts = await workOutModel.find({ user: loginUser._id });
    res.status(200).json(workouts);
  } catch (err) {
    console.log(err);
  }
};

//update workout for the specific
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const userId = req.body;
  if (!id) return res.status(400).json("Invalid Request");

  const { name, duration, caloriesBurned } = req.body;
  const workout = {
    ...(name && { name }),
    ...(duration && { duration }),
    ...(caloriesBurned && { caloriesBurned }),
  };
  const updatedWorkout = await workOutModel.findOneAndUpdate(
    { _id: id, user: userId },
    workout,
    { new: true }
  );

  console.log(updatedWorkout);

  if (!updatedWorkout) return res.status(400).json("workout not found");

  res.json(updatedWorkout);
};

module.exports = {
  getTodayWorkout,
  deleteOne,
  createWorkout,
  getallWorkout,
  updateWorkout,
};

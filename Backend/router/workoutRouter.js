const router = require("express").Router();

const workoutcontroller = require("../controller/workoutcontroller");

router.get("/", workoutcontroller.getTodayWorkout);

router.delete("/:id", workoutcontroller.deleteOne);

router.post("/", workoutcontroller.createWorkout);

module.exports = router;

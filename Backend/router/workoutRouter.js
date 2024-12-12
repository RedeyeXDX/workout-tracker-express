const router = require("express").Router();

const workoutcontroller = require("../controller/workoutcontroller");

router.get("/", workoutcontroller.getThreeWorkout);

module.exports = router;

const router = require("express").Router();

const workoutcontroller = require("../controller/workoutcontroller");

router.post("/get", workoutcontroller.getTodayWorkout);

router.delete("/:id", workoutcontroller.deleteOne);

router.post("/", workoutcontroller.createWorkout);

router.post("/All", workoutcontroller.getallWorkout);

router.put("/:id", workoutcontroller.updateWorkout);

module.exports = router;

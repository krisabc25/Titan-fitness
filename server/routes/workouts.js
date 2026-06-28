const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const workoutController = require("../controllers/workoutController");

router.use(authMiddleware);

router.post("/", workoutController.createWorkout);
router.get("/", workoutController.getWorkoutsByUser);
router.get("/by-date", workoutController.getWorkoutsByDate);
router.put("/:id", workoutController.updateWorkout);
router.delete("/:id", workoutController.deleteWorkout);

module.exports = router;
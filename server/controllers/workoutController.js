const Workout = require("../models/Workout");

exports.createWorkout = async (req, res) => {
  try {
    const { exercise, muscleGroup, sets, reps, weight, duration, notes } = req.body;
    
    const workout = new Workout({
      userId: req.userId,
      exercise,
      muscleGroup,
      sets,
      reps,
      weight,
      duration,
      notes,
      date: new Date()
    });

    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getWorkoutsByUser = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.userId }).sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getWorkoutsByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const workouts = await Workout.find({
      userId: req.userId,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).sort({ date: -1 });
    
    res.json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteWorkout = async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.json({ message: "Workout deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  exercise: String,
  muscleGroup: String,
  sets: Number,
  reps: Number,
  weight: Number,
  duration: Number,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Workout", WorkoutSchema);
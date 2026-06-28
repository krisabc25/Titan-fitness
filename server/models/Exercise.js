const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  muscleGroup: String,
  description: String,
  difficulty: String,
  equipment: [String],
  instructions: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
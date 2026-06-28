const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mealType: { type: String, enum: ["breakfast", "lunch", "dinner", "snack"], required: true },
  name: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fats: Number,
  fiber: Number,
  date: { type: Date, default: Date.now },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Meal", MealSchema);
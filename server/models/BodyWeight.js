const mongoose = require("mongoose");

const BodyWeightSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  weight: { type: Number, required: true },
  bodyFatPercentage: Number,
  muscleMass: Number,
  date: { type: Date, default: Date.now },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("BodyWeight", BodyWeightSchema);
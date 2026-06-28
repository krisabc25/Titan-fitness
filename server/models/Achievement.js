const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  description: String,
  icon: String,
  unlockedAt: { type: Date, default: Date.now },
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Achievement", AchievementSchema);
const mongoose = require("mongoose");

const PersonalRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  exercise: String,
  weight: Number,
  reps: Number,
  date: { type: Date, default: Date.now },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PersonalRecord", PersonalRecordSchema);
const BodyWeight = require("../models/BodyWeight");

exports.createBodyWeightEntry = async (req, res) => {
  try {
    const { weight, bodyFatPercentage, muscleMass, notes } = req.body;

    const entry = new BodyWeight({
      userId: req.userId,
      weight,
      bodyFatPercentage,
      muscleMass,
      notes,
      date: new Date()
    });

    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBodyWeightHistory = async (req, res) => {
  try {
    const entries = await BodyWeight.find({ userId: req.userId }).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBodyWeightByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const entries = await BodyWeight.find({
      userId: req.userId,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) }
    }).sort({ date: 1 });

    res.json(entries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBodyWeightEntry = async (req, res) => {
  try {
    await BodyWeight.findByIdAndDelete(req.params.id);
    res.json({ message: "Body weight entry deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
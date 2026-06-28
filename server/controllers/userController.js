const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, age, gender, height, currentWeight, goalWeight } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      age,
      gender,
      height,
      currentWeight,
      goalWeight,
      fitnessLevel: "beginner"
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "7d"
    });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "7d"
    });

    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
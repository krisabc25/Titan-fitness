const Meal = require("../models/Meal");

exports.createMeal = async (req, res) => {
  try {
    const { mealType, name, calories, protein, carbs, fats, fiber, notes } = req.body;

    const meal = new Meal({
      userId: req.userId,
      mealType,
      name,
      calories,
      protein,
      carbs,
      fats,
      fiber,
      notes,
      date: new Date()
    });

    await meal.save();
    res.status(201).json(meal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMealsByUser = async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.userId }).sort({ date: -1 });
    res.json(meals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMealsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const meals = await Meal.find({
      userId: req.userId,
      date: { $gte: startDate, $lte: endDate }
    });

    const totalCalories = meals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
    const totalProtein = meals.reduce((sum, meal) => sum + (meal.protein || 0), 0);
    const totalCarbs = meals.reduce((sum, meal) => sum + (meal.carbs || 0), 0);
    const totalFats = meals.reduce((sum, meal) => sum + (meal.fats || 0), 0);

    res.json({ meals, totals: { totalCalories, totalProtein, totalCarbs, totalFats } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMeal = async (req, res) => {
  try {
    await Meal.findByIdAndDelete(req.params.id);
    res.json({ message: "Meal deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
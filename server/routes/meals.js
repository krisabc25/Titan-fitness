const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const mealController = require("../controllers/mealController");

router.use(authMiddleware);

router.post("/", mealController.createMeal);
router.get("/", mealController.getMealsByUser);
router.get("/by-date", mealController.getMealsByDate);
router.delete("/:id", mealController.deleteMeal);

module.exports = router;
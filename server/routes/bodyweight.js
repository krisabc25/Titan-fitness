const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const bodyWeightController = require("../controllers/bodyWeightController");

router.use(authMiddleware);

router.post("/", bodyWeightController.createBodyWeightEntry);
router.get("/", bodyWeightController.getBodyWeightHistory);
router.get("/by-date-range", bodyWeightController.getBodyWeightByDateRange);
router.delete("/:id", bodyWeightController.deleteBodyWeightEntry);

module.exports = router;
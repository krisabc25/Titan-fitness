const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const userController = require("../controllers/userController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

router.use(authMiddleware);

router.get("/profile", userController.getUserProfile);
router.put("/profile", userController.updateUserProfile);

module.exports = router;
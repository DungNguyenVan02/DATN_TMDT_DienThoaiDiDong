const express = require("express");
const userController = require("../controllers/userController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/register", userController.register);
router.post("/completed", userController.completed);
router.post("/forgot-password", userController.forgotPassword);
router.put("/reset-password", userController.resetPassword);
router.post("/login", userController.login);
router.post("/logout", verifyAccessToken, userController.logout);
router.get("/current", verifyAccessToken, userController.getUser);
router.get(
	"/refresh-token",
	verifyAccessToken,
	userController.refreshAccessToken
);
router.get("/", verifyAccessToken, isAdmin, userController.getUsers);

module.exports = router;

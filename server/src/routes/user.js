const express = require("express");
const userController = require("../controllers/userController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const upload = require("../config/cloudinary");

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
router.put(
	"/update-info",
	upload.single("avatar"),
	verifyAccessToken,
	userController.updateInfo
);

router.put("/update-address", verifyAccessToken, userController.updateAddress);
router.put(
	"/update-address/:nad",
	verifyAccessToken,
	userController.deleteAddress
);
router.put("/update-cart", verifyAccessToken, userController.updateCart);

router.put(
	"/update/:uid",
	verifyAccessToken,
	isAdmin,
	userController.updateUserByAdmin
);
router.delete("/:uid", verifyAccessToken, isAdmin, userController.deleteUser);
router.get("/", verifyAccessToken, isAdmin, userController.getUsers);

module.exports = router;

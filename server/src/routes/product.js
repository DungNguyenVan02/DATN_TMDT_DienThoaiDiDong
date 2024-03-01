const express = require("express");
const { isAdmin, verifyAccessToken } = require("../middlewares/verifyToken");
const productController = require("../controllers/productController");
const upload = require("../config/cloudinary");

const router = express.Router();

router.post(
	"/create",
	upload.fields([
		{
			name: "images",
			maxCount: 10,
		},
		{ name: "thumb", maxCount: 1 },
	]),
	verifyAccessToken,
	isAdmin,
	productController.createProduct
);
router.get("/:pid", verifyAccessToken, productController.getProduct);
router.post("/ratings", verifyAccessToken, productController.ratingsProduct);
router.put("/update-sold", verifyAccessToken, productController.updateSold);
router.put(
	"/variants/:pid",
	verifyAccessToken,
	productController.addVariantsProduct
);

router.put(
	"/:pid",
	verifyAccessToken,
	isAdmin,
	productController.updateProduct
);
router.delete(
	"/:pid",
	verifyAccessToken,
	isAdmin,
	productController.deleteProduct
);
router.get("/", verifyAccessToken, isAdmin, productController.getProducts);

module.exports = router;

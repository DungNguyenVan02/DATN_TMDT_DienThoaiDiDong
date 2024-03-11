const express = require("express");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.get("/", categoryController.getCategories);

router.use(verifyAccessToken, isAdmin);
router.post("/create", categoryController.createCategory);
router.put("/:cid", categoryController.updateCategory);
router.delete("/:cid", categoryController.deleteCategory);

module.exports = router;

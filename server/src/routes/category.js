const express = require("express");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.use(verifyAccessToken, isAdmin);

router.post("/create", categoryController.createCategory);
router.put("/:cid", categoryController.updateCategory);
router.delete("/:cid", categoryController.deleteCategory);
router.get("/", categoryController.getCategories);

module.exports = router;

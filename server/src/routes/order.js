const express = require("express");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.put("/status/:oid", verifyAccessToken, orderController.updateStatus);
router.put(
	"/confirm/:oid",
	verifyAccessToken,
	isAdmin,
	orderController.confirmReturn
);
router.delete("/delete/:oid", verifyAccessToken, orderController.deleteOrder);
router.get("/return-order", verifyAccessToken, orderController.getReturnOrder);
router.get(
	"/history-order",
	verifyAccessToken,
	orderController.getUserHistoryOrder
);

router.get("/admin", verifyAccessToken, isAdmin, orderController.getOrders);
router.get(
	"/admin/all-orders",
	verifyAccessToken,
	isAdmin,
	orderController.getAllOrders
);
router.get(
	"/admin/canceled",
	verifyAccessToken,
	isAdmin,
	orderController.getOrderCanceled
);
router.get(
	"/admin/return-refund",
	verifyAccessToken,
	isAdmin,
	orderController.getOrderReturn
);
router.post("/", verifyAccessToken, orderController.createOrder);
router.get("/", verifyAccessToken, orderController.getUserOrder);

module.exports = router;

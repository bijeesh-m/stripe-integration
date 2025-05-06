const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

// router.post("/", orderController.createOrder);
// router.get("/", orderController.getOrders);
// router.get("/user-orders/:userId", orderController.getUserOrders);
// router.get("/:orderId", orderController.findById);
router.post("/checkout/:userId", orderController.checkout);

module.exports = router;

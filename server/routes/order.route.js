const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.post("/", orderController.createOrder);
router.get("/", orderController.getOrders);
router.get("/user-orders/:userId", orderController.getUserOrders);
router.get("/:orderId", orderController.findById);
router.post("/create-payment-intent", orderController.checkout);

module.exports = router;

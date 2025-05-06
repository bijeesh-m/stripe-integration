const express = require("express");
const cartController = require("../controllers/cart.controller");
const router = express.Router();

router.get("/", cartController.getUserCart);
router.post("/",cartController.addToCart);
router.delete("/:productId",cartController.removeFromCart);

module.exports = router;

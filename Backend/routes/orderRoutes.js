const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

// Place Order
router.post("/", placeOrder);

// Admin Routes
router.get("/admin/all", getAllOrders);

//Order Status
router.put(
  "/admin/status/:orderId",
  updateOrderStatus
);

// User Orders
router.get("/:userId", getUserOrders);

module.exports = router;
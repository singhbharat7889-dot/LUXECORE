const express = require("express");
const router = express.Router();

const {
  userId,
  getCart,
  addToCart,
  updateCart,
  deleteCart,
} = require("../controllers/cartController");

router.get("/:userId", getCart);

router.post("/", addToCart);

router.put("/:id", updateCart);

router.delete("/:id", deleteCart);

module.exports = router;

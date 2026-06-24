const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.post(
  "/",
  upload.single("images"),
  createProduct
);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.put(
  "/:id",
  upload.single("images"),
  updateProduct
);

router.delete("/:id", deleteProduct);

module.exports = router;
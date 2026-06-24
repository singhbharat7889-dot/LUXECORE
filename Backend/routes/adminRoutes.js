const express = require("express");
const router = express.Router();

router.get("/ProductForm", (req, res) => {
  res.json({
    message: "Admin Dashboard"
  });
});

module.exports = router;
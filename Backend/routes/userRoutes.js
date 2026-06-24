const express = require("express");

const router = express.Router();

const userControls =
  require("../controllers/userControl");

router.post(
  "/UserRegister",
  userControls.register
);

router.post(
  "/UserLogin",
  userControls.login
);

module.exports = router;
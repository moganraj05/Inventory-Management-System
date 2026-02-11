const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// 🔹 Forgot Password Route
router.post("/forgot-password", forgotPassword);

// 🔹 Reset Password Route
router.post("/reset-password", resetPassword);

module.exports = router;

const express = require("express");
const {
  stockIn,
  stockOut,
  getStockTransactions
} = require("../controllers/stockController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/in", protect, stockIn);
router.post("/out", protect, stockOut);
router.get("/", protect, getStockTransactions);

module.exports = router;

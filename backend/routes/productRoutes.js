const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

const router = express.Router();

// Admin only
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

// Any logged-in user
router.get("/", protect, getProducts);
router.get("/:id", protect, getProductById);

module.exports = router;

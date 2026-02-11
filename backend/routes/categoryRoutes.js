const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

const router = express.Router();

// Admin only
router.post("/", protect, adminOnly, createCategory);
router.put("/:id", protect, adminOnly, updateCategory);
router.delete("/:id", protect, adminOnly, deleteCategory);

// Any logged-in user
router.get("/", protect, getCategories);
router.get("/:id", protect, getCategoryById);

module.exports = router;

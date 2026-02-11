const express = require("express");
const {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier
} = require("../controllers/supplierController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

const router = express.Router();

// Admin only
router.post("/", protect, adminOnly, createSupplier);
router.put("/:id", protect, adminOnly, updateSupplier);
router.delete("/:id", protect, adminOnly, deleteSupplier);

// Any logged-in user
router.get("/", protect, getSuppliers);
router.get("/:id", protect, getSupplierById);

module.exports = router;

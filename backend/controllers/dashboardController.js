const Product = require("../models/Product");
const Category = require("../models/Category");
const Supplier = require("../models/Supplier");
const StockTransaction = require("../models/StockTransaction");

// GET DASHBOARD STATS
exports.getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalSuppliers = await Supplier.countDocuments();

    const lowStockProducts = await Product.find({
      $expr: { $lte: ["$quantity", "$minStockLevel"] }
    });

    const stockSummary = await StockTransaction.aggregate([
      {
        $group: {
          _id: "$type",
          totalQuantity: { $sum: "$quantity" }
        }
      }
    ]);

    const recentTransactions = await StockTransaction.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("product", "name")
      .populate("performedBy", "name");

    res.json({
      totalProducts,
      totalCategories,
      totalSuppliers,
      lowStockCount: lowStockProducts.length,
      lowStockProducts,
      stockSummary,
      recentTransactions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

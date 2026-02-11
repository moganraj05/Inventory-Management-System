const StockTransaction = require("../models/StockTransaction");
const Product = require("../models/Product");

// STOCK IN
exports.stockIn = async (req, res) => {
  try {
    const { productId, quantity, supplierId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.quantity += quantity;
    await product.save();

    const transaction = await StockTransaction.create({
      product: productId,
      type: "IN",
      quantity,
      supplier: supplierId,
      performedBy: req.user.id
    });

    res.status(201).json({
      message: "Stock added successfully",
      product,
      transaction
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// STOCK OUT
exports.stockOut = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({
        message: "Insufficient stock"
      });
    }

    product.quantity -= quantity;
    await product.save();

    const transaction = await StockTransaction.create({
      product: productId,
      type: "OUT",
      quantity,
      performedBy: req.user.id
    });

    res.status(201).json({
      message: "Stock removed successfully",
      product,
      transaction
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL STOCK TRANSACTIONS
exports.getStockTransactions = async (req, res) => {
  try {
    const transactions = await StockTransaction.find()
      .populate("product", "name")
      .populate("supplier", "name")
      .populate("performedBy", "name");

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

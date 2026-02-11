const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const { protect } = require("./middleware/authMiddleware");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const stockRoutes = require("./routes/stockRoutes");


const app = express();
app.get("/api/ping", (req, res) => {
  res.json({ message: "API is alive" });
});


// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/dashboard", dashboardRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Inventory Management API Running");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello API working" });
});


app.get("/api/test/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

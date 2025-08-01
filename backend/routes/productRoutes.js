const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET /api/products - List all products with department info
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("department", "name");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// GET /api/products/:id - Get a specific product by ID with department info
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("department", "name");
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: "Invalid product ID" });
  }
});

module.exports = router;

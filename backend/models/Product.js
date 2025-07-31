const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  cost: Number,
  category: String,
  name: String,
  brand: String,
  retail_price: Number,
  sku: String,
  distribution_center_id: Number,
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department", // Reference to Department model
    required: true
  }
});

module.exports = mongoose.model("Product", productSchema);

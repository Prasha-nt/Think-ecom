const fs = require("fs");
const csv = require("csv-parser");
const connectDB = require("../db/connect");
const Product = require("../models/Product");
require("dotenv").config();

const importProducts = async () => {
  await connectDB();

  const products = [];

  fs.createReadStream("data/products.csv")
    .pipe(csv())
    .on("data", (row) => {
      const product = {
        id: Number(row.id),
        cost: Number(row.cost),
        category: row.category,
        name: row.name,
        brand: row.brand,
        retail_price: Number(row.retail_price),
        department: row.department,
        sku: row.sku,
        distribution_center_id: Number(row.distribution_center_id),
      };

      // Optional: Validate fields
      if (Object.values(product).some((v) => v === null || v === undefined || Number.isNaN(v))) {
        console.warn("⚠️ Skipping invalid row:", row);
      } else {
        products.push(product);
      }
    })
    .on("end", async () => {
      try {
        await Product.deleteMany(); // Clear old data
        await Product.insertMany(products);
        console.log("✅ Imported", products.length, "products");
        process.exit();
      } catch (err) {
        console.error("❌ Import failed:", err);
        process.exit(1);
      }
    });
};

importProducts();

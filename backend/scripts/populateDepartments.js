// scripts/populateDepartments.js
import Product from "../models/Product.js";
import Department from "../models/Department.js";
import db from "../config/db.js"; // connect DB

const populateDepartments = async () => {
  await db(); // connect to Mongo

  const products = await Product.find({});
  const deptSet = new Set(products.map(p => p.department)); // assuming department is string

  const deptMap = {};

  for (const deptName of deptSet) {
    const dept = new Department({ name: deptName });
    await dept.save();
    deptMap[deptName] = dept._id;
  }

  // Now update each product
  for (const product of products) {
    const deptId = deptMap[product.department];
    product.department = deptId;
    await product.save();
  }

  console.log("Migration completed.");
  process.exit();
};

populateDepartments();

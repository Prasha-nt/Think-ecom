// migrateDepartments.js
const mongoose = require("mongoose");
const Product = require("./models/Product");
const Department = require("./models/Department");

mongoose.connect("mongodb://localhost:27017/ecomm", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function migrateDepartments() {
  try {
    const products = await Product.find();
    const departmentMap = {};

    for (const product of products) {
      const deptName = product.department?.trim();
      if (!deptName) continue;

      if (!departmentMap[deptName]) {
        let dept = await Department.findOne({ name: deptName });

        if (!dept) {
          dept = new Department({ name: deptName });
          await dept.save();
          console.log(`✅ Created department: ${deptName}`);
        }

        departmentMap[deptName] = dept._id;
      }

      product.department = departmentMap[deptName];
      await product.save();
      console.log(`🔄 Updated product: ${product.name}`);
    }

    console.log("\n🎉 Migration completed successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Migration error:", err);
    process.exit(1);
  }
}

migrateDepartments();


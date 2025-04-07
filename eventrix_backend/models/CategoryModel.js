const mongoose = require("mongoose");

// Category Schema
const categorySchema = new mongoose.Schema({
  category_name: { type: String, required: true, unique: true }, // Category Name
  description: { type: String }, // Category Description
  category_image: { type: String }, // Image filename (path stored in DB)
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Linked products
  vendorEnabled: { type: Boolean, default: false }, // Show vendor field in product form
  outletEnabled: { type: Boolean, default: false }, // Show outlet field in product form
  properties: [
    {
      name: { type: String },
      type: { type: String }, // e.g., text, number, dropdown, etc.
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Pre-save middleware to update 'updatedAt' field automatically
categorySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
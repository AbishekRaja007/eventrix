const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  description: { type: String, required: true },
  availability_status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },
  SKU: {
    type: String,
    required: true,
    unique: true,
  },
  product_image: { type: String, required: true },
  all_product_images: [{ type: String }],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  outlets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outlet",
    },
  ],

  selling_price: { type: Number, required: true },
  display_price: { type: Number },

  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },

  properties: {
    type: Map,
    of: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Product", productSchema);

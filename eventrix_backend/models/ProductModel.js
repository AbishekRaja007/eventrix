const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  description: { type: String, required: true },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  availability_status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },

  main_image: { type: String }, // Filename or URL of main image
  additional_images: [{ type: String }], // Array of filenames/URLs

  selling_price: { type: Number, required: true },
  display_price: { type: Number },

  properties: {
    type: Map,
    of: String, // Can be changed to Mixed if you allow different types
    default: {},
  },

  // Optional fields for future extension
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
  outlet: [
    {
      outlet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Outlet",
      },
      products: [
        {
          volume: { type: String },
          selling_price: { type: Number },
          display_price: { type: Number },
        },
      ],
    },
  ],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Auto-update `updatedAt`
productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

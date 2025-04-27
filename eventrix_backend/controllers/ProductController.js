const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Product = require("../models/ProductModel");
const Category = require("../models/CategoryModel");

// Multer setup
const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/product_images";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const productUpload = multer({ storage: productStorage });

// SKU generator
const generateSKU = () => {
  return `SKU-${Date.now().toString(36)}-${Math.floor(Math.random() * 10000).toString(36).toUpperCase()}`;
};

const addProduct = async (req, res) => {
  try {
    const {
      product_name,
      description,
      availability_status,
      category,
      vendor,
      outlet, // may still be sent as a single outlet for now
      outlets, // optional: if you send multiple outlets
      selling_price,
      display_price,
    } = req.body;

    // Validate Category
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return res.status(400).json({ message: "Invalid category" });
    }

    if (categoryDoc.vendorEnabled && !vendor) {
      return res.status(400).json({ message: "Vendor is required for this category" });
    }

    if (categoryDoc.outletEnabled && !(outlets || outlet)) {
      return res.status(400).json({ message: "Outlet is required for this category" });
    }

    // Extract dynamic properties from category
    const properties = {};
    if (Array.isArray(categoryDoc.properties)) {
      categoryDoc.properties.forEach((prop) => {
        const key = `properties[${prop.name}]`;
        if (req.body[key]) {
          properties[prop.name] = req.body[key];
        }
      });
    }

    // Image handling
    let product_image = null;
    let all_product_images = [];

    if (req.files?.main_image?.[0]) {
      product_image = req.files.main_image[0].path;
    }

    if (req.files?.additional_images) {
      all_product_images = req.files.additional_images.map((file) => file.path);
    }

    // Use single outlet or array of outlets
    const outletArray = outlets
      ? JSON.parse(outlets)
      : outlet
      ? [outlet]
      : [];

    // Create product document
    const newProduct = new Product({
      product_name,
      description,
      category,
      vendor: vendor || undefined,
      availability_status,
      SKU: generateSKU(),
      product_image,
      all_product_images,
      outlets: outletArray,
      selling_price: parseFloat(selling_price),
      display_price: parseFloat(display_price),
      properties,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
};

const getAllAddedProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("vendor")
      .populate("outlets"); // updated from outlet_pricing.outlet to outlets

    const enrichedProducts = products.map((product) => {
      return {
        ...product.toObject(),
        lowestPrice: product.selling_price || 0, // use selling_price directly
      };
    });

    res.status(200).json(enrichedProducts);
  } catch (error) {
    console.error("Error fetching all added products:", error);
    res.status(500).json({ message: "Error fetching products", error });
  }
};

module.exports = {
  addProduct,
  productUpload,
  getAllAddedProducts,
};

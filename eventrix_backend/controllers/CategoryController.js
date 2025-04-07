const Category = require("../models/CategoryModel");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Configure Multer storage for category images
const categoryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/category_images";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Multer middleware for uploading category images
const categoryUpload = multer({ storage: categoryStorage });

// Controller to add a new category
const addCategory = async (req, res) => {
  try {
    const {
      category_name,
      description,
      vendorEnabled,
      outletEnabled,
      properties,
    } = req.body;

    // Check if category already exists
    const existing = await Category.findOne({ category_name });
    if (existing) {
      return res.status(400).json({ error: "Category already exists" });
    }

    // Process uploaded image
    const category_image = req.file ? req.file.path : "";

    // Parse properties (if sent as JSON string from frontend)
    let parsedProperties = [];
    if (properties) {
      parsedProperties = typeof properties === "string"
        ? JSON.parse(properties)
        : properties;
    }

    const newCategory = new Category({
      category_name,
      description,
      category_image,
      vendorEnabled,
      outletEnabled,
      properties: parsedProperties,
    });

    await newCategory.save();

    res.status(201).json({
      message: "Category added successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller to fetch all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("products");
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  categoryUpload, // Export the multer middleware
};

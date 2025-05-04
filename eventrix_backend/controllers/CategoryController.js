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
      tags,
      locationEnabled,
      location // this comes as an object: { address, latitude, longitude }
    } = req.body;

    // Check if category already exists
    const existing = await Category.findOne({ category_name });
    if (existing) {
      return res.status(400).json({ error: "Category already exists" });
    }

    // Process uploaded image
    const category_image = req.file ? req.file.path : "";

    // Parse properties and include options for dropdowns
    let parsedProperties = [];
    if (properties) {
      parsedProperties =
        typeof properties === "string" ? JSON.parse(properties) : properties;

      // Ensure dropdown options are included
      parsedProperties = parsedProperties.map((prop) => {
        if (prop.type === "dropdown" && !prop.options) {
          prop.options = []; // Default to an empty array if options are missing
        }
        return prop;
      });
    }

    // Parse tags
    let parsedTags = [];
    if (tags) {
      parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
    }

    // Parse location
    let parsedLocation = {};
    if (locationEnabled && location) {
      const locObj = typeof location === "string" ? JSON.parse(location) : location;
      parsedLocation = {
        address: locObj.address || "",
        latitude: locObj.latitude || "",
        longitude: locObj.longitude || "",
      };
    }

    const newCategory = new Category({
      category_name,
      description,
      category_image,
      vendorEnabled,
      outletEnabled,
      properties: parsedProperties,
      tags: parsedTags,
      locationEnabled: locationEnabled === "true" || locationEnabled === true,
      location: parsedLocation,
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
  categoryUpload,
};

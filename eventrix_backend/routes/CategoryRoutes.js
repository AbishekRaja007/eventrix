const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  addCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
  getCategoryCount,
  getCategoryProductCounts,
} = require("../controllers/CategoryController");

// Multer storage configuration for category image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categories/"); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Add a new category (with image upload)
router.post("/add-category", upload.single("category_image"), addCategory);

// Get all categories
router.get("/all-categories", getAllCategories);

// Get a category by ID
router.get("/single-category/:id", getCategoryById);

// Delete a category by ID
router.delete("/delete-category/:id", deleteCategory);

// Update a category by ID (with image upload)
router.put("/update-category/:id", upload.single("category_image"), updateCategory);

// Get the total count of categories
router.get("/category-count", getCategoryCount);

// Get product counts for all categories
router.get("/category-product-counts", getCategoryProductCounts);

module.exports = router;

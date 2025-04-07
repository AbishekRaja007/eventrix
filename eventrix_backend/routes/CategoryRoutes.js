const express = require("express");
const router = express.Router();
const {
  addCategory,
  getAllCategories,
  categoryUpload,
} = require("../controllers/CategoryController");

// Add category with image
router.post(
  "/add-category",
  categoryUpload.single("category_image"), // Field name should match frontend
  addCategory
);

// Get all categories
router.get("/all-categories", getAllCategories);

module.exports = router;

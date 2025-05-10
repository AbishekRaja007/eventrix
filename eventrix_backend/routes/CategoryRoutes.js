const express = require("express");
const router = express.Router();
const {
  addCategory,
  getAllCategories,
  categoryUpload,
  getTopThreeCategories,
} = require("../controllers/CategoryController");

// Add category with image
router.post(
  "/add-category",
  categoryUpload.single("category_image"), // Field name should match frontend
  addCategory
);

// Get all categories
router.get("/all-categories", getAllCategories);
router.get("/top-categories", getTopThreeCategories);

module.exports = router;

const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");
const path = require("path");
const fs = require("fs");

// Controller function to add a new category
const addCategory = async (req, res) => {
  try {
    const { category_name, description } = req.body;
    const category_image = req.file ? req.file.filename : null; // Handle image upload

    if (!category_name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Create new category
    const newCategory = new Category({
      category_name,
      description,
      category_image,
    });

    await newCategory.save();

    res.status(201).json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Server error" });
  }
};


// Controller function to fetch all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

// Controller function to fetch a single category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching single category:", error);
    res.status(500).json({ message: "Error fetching single category." });
  }
};

// Controller function to delete a category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the category to delete
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Delete category image from server if exists
    if (category.category_image) {
      const imagePath = path.join(__dirname, "../uploads", category.category_image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete the category from the database
    await Category.findByIdAndDelete(id);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Error deleting category" });
  }
};

// Controller function to update a category by ID
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name, description } = req.body;
    let category_image = req.file ? req.file.filename : undefined;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Delete old category image if a new one is uploaded
    if (category_image && category.category_image) {
      const oldImagePath = path.join(__dirname, "../uploads", category.category_image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    category.category_name = category_name;
    category.description = description;
    if (category_image) {
      category.category_image = category_image;
    }

    await category.save();

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Error updating category" });
  }
};

// Controller function to get the total number of categories
const getCategoryCount = async (req, res) => {
  try {
    const categoryCount = await Category.countDocuments();
    res.status(200).json({ categoryCount });
  } catch (error) {
    console.error("Error fetching category count:", error);
    res.status(500).json({ message: "Error fetching category count", error });
  }
};

// Controller function to get product counts for categories
const getCategoryProductCounts = async (req, res) => {
  try {
    const categories = await Category.find();

    const counts = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.countDocuments({
          category: category._id,
        });

        return {
          categoryId: category._id,
          categoryName: category.category_name,
          productCount,
        };
      })
    );

    res.status(200).json(counts);
  } catch (error) {
    console.error("Error fetching product counts:", error);
    res.status(500).json({ message: "Error fetching product counts", error });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
  getCategoryCount,
  getCategoryProductCounts,
};

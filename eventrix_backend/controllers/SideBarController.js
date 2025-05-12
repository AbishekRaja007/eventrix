// controllers/SideBarController.js
const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");
const SideBarModel = require("../models/SideBarModel");

// POST /api/sidebar/:categoryId  — to add/update sidebar content
exports.addSidebarContent = async (req, res) => {
  const { categoryId, propertyValues = {}, displayTypes = {}, locations = [] } = req.body;

  if (!categoryId) {
    return res.status(400).json({ error: "categoryId is required" });
  }

  // overwrite existing or create new
  await SideBarModel.findOneAndUpdate(
    { categoryId },
    { propertyValues, displayTypes, locations },
    { upsert: true }
  );

  return res.status(201).json({ message: "Sidebar content saved." });
};

// GET /api/sidebar/:categoryId  — to fetch the config
exports.getSidebarContent = async (req, res) => {
  const { categoryId } = req.params;
  const sidebar = await SideBarModel.findOne({ categoryId });
  if (!sidebar) return res.status(404).json({ error: "No sidebar config found." });

  // Optionally, you could merge CategoryModel.dynamicProperties here instead of storing them separately
  res.json({
    propertyValues: sidebar.propertyValues,
    displayTypes: sidebar.displayTypes,
    locations: sidebar.locations,
  });
};

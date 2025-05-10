// routes/SideBarRoute.js
const express = require("express");
const router = express.Router();
const {
  addSidebarContent,
  getSidebarContent,
} = require("../controllers/SideBarController");

// Add or update sidebar content
router.post("/sidebar", addSidebarContent);

// Fetch sidebar config for a category
router.get("/sidebar/:categoryId", getSidebarContent);

module.exports = router;

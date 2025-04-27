const express = require("express");
const router = express.Router();
const {
  addProduct,
  productUpload,
  getAllAddedProducts, // ✅ Import the missing controller function
} = require("../controllers/ProductController");

router.post(
  "/add-product",
  productUpload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "additional_images", maxCount: 10 },
  ]),
  addProduct
);

router.get("/all-added-products", getAllAddedProducts);

module.exports = router;

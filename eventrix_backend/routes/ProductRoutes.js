const express = require("express");
const router = express.Router();

const {
  addProduct,
  productUpload,
  getAllAddedProducts,
  getProductsByCategory,
  getSingleProduct, // ✅ Import new controller
} = require("../controllers/ProductController");

// Route to add a new product
router.post(
  "/add-product",
  productUpload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "additional_images", maxCount: 10 },
  ]),
  addProduct
);

// Route to get all added products
router.get("/all-added-products", getAllAddedProducts);

// Route to get products by category
router.get("/products/category/:categoryId", getProductsByCategory);

router.get('/products/:productId', getSingleProduct);

module.exports = router;

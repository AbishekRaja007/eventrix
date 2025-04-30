const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Product = require("../models/ProductModel");
const Category = require("../models/CategoryModel");
const Vendor = require("../models/VendorModel"); // Import Vendor model
const Outlet = require("../models/OutletModel"); // Import Outlet model

// Multer setup
const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/product_images";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const productUpload = multer({ storage: productStorage });

// SKU generator
const generateSKU = () => {
  return `SKU-${Date.now().toString(36)}-${Math.floor(Math.random() * 10000).toString(36).toUpperCase()}`;
};

// Add Product
const addProduct = async (req, res) => {
  try {
    const {
      product_name,
      description,
      availability_status,
      category,
      vendor,
      outlet,
      outlets,
      selling_price,
      display_price,
      properties,
    } = req.body;

    // Validate Category
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return res.status(400).json({ message: "Invalid category" });
    }

    if (categoryDoc.vendorEnabled && !vendor) {
      return res.status(400).json({ message: "Vendor is required for this category" });
    }

    if (categoryDoc.outletEnabled && !(outlets || outlet)) {
      return res.status(400).json({ message: "Outlet is required for this category" });
    }

    // Parse and validate dynamic properties
    const parsedProperties = properties ? JSON.parse(properties) : {};
    const validProperties = {};

    if (Array.isArray(categoryDoc.properties)) {
      categoryDoc.properties.forEach((prop) => {
        if (parsedProperties[prop.name] !== undefined) {
          validProperties[prop.name] = parsedProperties[prop.name];
        }
      });
    }

    // Image handling
    let product_image = null;
    let all_product_images = [];

    if (req.files?.main_image?.[0]) {
      product_image = req.files.main_image[0].path;
    }

    if (req.files?.additional_images) {
      all_product_images = req.files.additional_images.map((file) => file.path);
    }

    // Use single outlet or multiple
    const outletArray = outlets
      ? JSON.parse(outlets)
      : outlet
      ? [outlet]
      : [];

    // Create product with properties
    const newProduct = new Product({
      product_name,
      description,
      category,
      vendor: vendor || undefined,
      availability_status,
      SKU: generateSKU(),
      product_image,
      all_product_images,
      outlets: outletArray,
      selling_price: parseFloat(selling_price),
      display_price: parseFloat(display_price),
      properties: validProperties,
    });

    const savedProduct = await newProduct.save();

    // Update vendor's products array if vendor is provided
    if (vendor) {
      await Vendor.findByIdAndUpdate(vendor, {
        $push: { products: { product: savedProduct._id, quantity: 1 } },
      });
    }

    // Update outlet's products array if outlet(s) are provided
    if (outletArray.length > 0) {
      await Outlet.updateMany(
        { _id: { $in: outletArray } },
        { $push: { products: { product: savedProduct._id, quantity: 1 } } }
      );
    }

    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
};


// Get All Products
const getAllAddedProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("vendor")
      .populate("outlets");

    const enrichedProducts = products.map((product) => {
      return {
        ...product.toObject(),
        lowestPrice: product.selling_price || 0,
      };
    });

    res.status(200).json(enrichedProducts);
  } catch (error) {
    console.error("Error fetching all added products:", error);
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get Products By Category (NEW)
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const products = await Product.find({ category: categoryId })
      .populate("vendor")
      .populate("outlets");

    res.status(200).json({
      categoryName: category.category_name,
      products,
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Failed to fetch products by category", error: error.message });
  }
};


// Get Single Product by ID
const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId)
      .populate("category")
      .populate("vendor")
      .populate("outlets");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log("Product Properties:", product.properties);

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching single product:", error);
    res.status(500).json({ message: "Failed to fetch product", error: error.message });
  }
};



module.exports = {
  addProduct,
  productUpload,
  getAllAddedProducts,
  getSingleProduct,
  getProductsByCategory, // Exporting new controller
};

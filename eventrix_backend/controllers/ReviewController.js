const Review = require("../models/Review");

// Get all reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error); // Log error
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Add a new review
exports.addReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    if (!name || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newReview = new Review({ name, rating, comment });
    await newReview.save();

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error("Error adding review:", error); // Log error
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const express = require("express");
const { getReviews, addReview } = require("../controllers/ReviewController");

const router = express.Router();

router.get("/reviews", getReviews);
router.post("/reviews", addReview);

module.exports = router;

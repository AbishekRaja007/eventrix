import React, { useEffect, useState, useContext } from "react"; // Add useContext
import { useParams } from "react-router-dom";
import axios from "axios";
import backendGlobalRoute from "../../config/config";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaCartPlus, FaMapMarkerAlt } from "react-icons/fa"; // Import location icon
import Modal from "react-modal"; // Import Modal for popup
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { FaRegImage, FaRegHeart, FaPen, FaShareAlt, FaHeart } from "react-icons/fa"; // Import filled heart icon
import { AuthContext } from "../../components/auth_components/AuthManager"; // Import AuthContext
// Set the root element for accessibility
Modal.setAppElement("#root");

// Custom icon instance (outside component to avoid recreation)
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const SingleProduct = () => {
  const { user: loggedInUser } = useContext(AuthContext); // Access logged-in user from AuthContext
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [vendor, setVendor] = useState(null); // State to store vendor details
  const [loading, setLoading] = useState(true);
  const [isMapOpen, setIsMapOpen] = useState(false); // State to control map popup
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    functionDate: "",
  });
  const [reviewData, setReviewData] = useState({
    rating: 0,
    reviewContent: "",
    photos: [],
  });
  const [reviews, setReviews] = useState([]); // State to store reviews
  const [isEditing, setIsEditing] = useState(false); // State to track if editing
  const [editingReviewId, setEditingReviewId] = useState(null); // Track the review being edited
  const [selectedRatings, setSelectedRatings] = useState([]); // Track selected ratings for filtering
  const [isShortlisted, setIsShortlisted] = useState(false); // Track if the product is shortlisted

  const placeholderImage = "/placeholder.jpg"; // <-- Update with correct path

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vendor) {
      alert("Vendor details are not available.");
      return;
    }

    const data = {
      userName: formData.name,
      userEmail: formData.email,
      userPhone: formData.phone,
      functionDate: formData.functionDate,
      vendorEmail: vendor.vendor_email,
    };

    try {
      await axios.post(`${backendGlobalRoute}/api/send-contact-email`, data);
      alert("Your inquiry has been sent successfully!");
    } catch (error) {
      console.error("Error sending inquiry:", error);
      alert("Failed to send your inquiry. Please try again.");
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewData.rating || !reviewData.reviewContent) {
      alert("Please provide a rating and review content.");
      return;
    }

    if (!loggedInUser) {
      alert("You must be logged in to submit a review.");
      return;
    }

    const formData = new FormData();
    formData.append("rating", reviewData.rating);
    formData.append("reviewContent", reviewData.reviewContent);
    Array.from(reviewData.photos).forEach((photo) => formData.append("photos", photo)); // Append multiple photos
    formData.append("username", loggedInUser.username); // Use loggedInUser from AuthContext
    formData.append("userId", loggedInUser.id);
    formData.append("productName", product.product_name);
    formData.append("productId", product._id);

    try {
      await axios.post(`${backendGlobalRoute}/api/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Review submitted successfully!");
      setReviewData({ rating: 0, reviewContent: "", photos: [] });
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
        await axios.delete(`${backendGlobalRoute}/api/delete/${reviewId}`);
        alert("Review deleted successfully!");
        setReviews(reviews.filter((review) => review._id !== reviewId)); // Remove the deleted review from state
    } catch (error) {
        console.error("Error deleting review:", error);
        alert("Failed to delete review. Please try again.");
    }
};

const handleEditReview = (review) => {
    setReviewData({
        rating: review.rating,
        reviewContent: review.reviewContent,
        photos: [], // Editing photos is optional; handle it as needed
    });
    setIsEditing(true); // Enable editing mode
    setEditingReviewId(review._id); // Track the review being edited
};

const handleUpdateReview = async () => {
    if (!editingReviewId) return;

    const updatedFormData = new FormData();
    updatedFormData.append("rating", reviewData.rating);
    updatedFormData.append("reviewContent", reviewData.reviewContent);
    Array.from(reviewData.photos).forEach((photo) => updatedFormData.append("photos", photo)); // Append multiple photos

    try {
        const response = await axios.put(
            `${backendGlobalRoute}/api/update/${editingReviewId}`,
            updatedFormData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        alert("Review updated successfully!");
        setReviews((prevReviews) =>
            prevReviews.map((r) => (r._id === editingReviewId ? response.data.review : r))
        ); // Update the review in the state
        setIsEditing(false); // Exit editing mode
        setEditingReviewId(null); // Clear the editing review ID
        setReviewData({ rating: 0, reviewContent: "", photos: [] }); // Reset the form
    } catch (error) {
        console.error("Error updating review:", error);
        alert("Failed to update review. Please try again.");
    }
};

// Calculate average rating and rating distribution
const calculateRatingStats = () => {
    const totalReviews = reviews.length;
    const ratingCounts = [0, 0, 0, 0, 0]; // Index 0 for 1-star, 1 for 2-star, etc.

    reviews.forEach((review) => {
        ratingCounts[5 - review.rating]++; // Fix: Correct index calculation for ratingCounts
    });

    const averageRating =
        totalReviews > 0
            ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
            : 0;

    return { averageRating, ratingCounts, totalReviews };
};

const { averageRating, ratingCounts, totalReviews } = calculateRatingStats();

// Handle rating filter
const handleRatingFilter = (rating) => {
    setSelectedRatings((prev) =>
        prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
};

// Filter reviews based on selected ratings
const filteredReviews =
    selectedRatings.length > 0
        ? reviews.filter((review) => selectedRatings.includes(review.rating))
        : reviews;

// Check if the product is already shortlisted
useEffect(() => {
    const fetchShortlistStatus = async () => {
        if (!loggedInUser) return;
        try {
            const response = await axios.get(`${backendGlobalRoute}/api/shortlist/${loggedInUser.id}`);
            const shortlistedProducts = response.data.map((item) => item.productId._id);
            setIsShortlisted(shortlistedProducts.includes(productId));
        } catch (error) {
            console.error("Error fetching shortlist status:", error);
        }
    };

    if (productId) {
        fetchShortlistStatus();
    }
}, [productId, loggedInUser]);

// Handle shortlist toggle
const handleShortlistToggle = async () => {
    if (!loggedInUser) {
        alert("You must be logged in to use the shortlist feature.");
        return;
    }

    try {
        if (isShortlisted) {
            // Remove from shortlist
            await axios.post(`${backendGlobalRoute}/api/shortlist/remove`, {
                userId: loggedInUser.id,
                productId,
            });
            setIsShortlisted(false);
            alert("Removed from shortlist.");
        } else {
            // Add to shortlist
            await axios.post(`${backendGlobalRoute}/api/shortlist/add`, {
                userId: loggedInUser.id,
                productId,
            });
            setIsShortlisted(true);
            alert("Added to shortlist.");
        }
    } catch (error) {
        console.error("Error toggling shortlist:", error);
        alert("Failed to update shortlist. Please try again.");
    }
};

  useEffect(() => {
    const fetchProductAndVendor = async () => {
      try {
        // Fetch product details
        const productRes = await axios.get(`${backendGlobalRoute}/api/products/${productId}`);
        setProduct(productRes.data);

        // Fetch vendor details using the vendor ID from the product
        if (productRes.data.vendor && productRes.data.vendor._id) {
          const vendorRes = await axios.get(
            `${backendGlobalRoute}/api/get-vendor-by-id/${productRes.data.vendor._id}`
          );
          setVendor(vendorRes.data);
          console.log("Fetched vendor details:", vendorRes.data); // Debug log
        }
      } catch (err) {
        console.error("Error fetching product or vendor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndVendor();
  }, [productId]);

  useEffect(() => {
    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${backendGlobalRoute}/api/allreviews?productId=${productId}`);
            setReviews(response.data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    if (productId) {
        fetchReviews();
    }
}, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Product not found
      </div>
    );
  }

  // Leaflet expects [lat, lng] format, but some APIs give [lng, lat]
  const locationCoords = Array.isArray(product.location?.coordinates)
    ? [product.location.coordinates[1], product.location.coordinates[0]]
    : null;

  return (
    <div className="w-full bg-gray-50">
      {/* Top Image + Price + Contact Card */}
      <div className="flex flex-col lg:flex-row gap-x-6 w-full max-w-7xl mx-auto mt-6">
        {/* Left Image Section */}
        <div className="lg:w-[750px] relative">
          <img
            
            src={
              product.product_image
                ? `${backendGlobalRoute}/${product.product_image.replace(/\\/g, "/")}`
                : placeholderImage
            }
            alt={product.product_name}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute left-9 bg-white px-4 py-4 shadow-md w-[90%] top-[350px] h-[150px] flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-xl">{product.product_name}</h2>
              {locationCoords && (
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-black" /> {/* Location Icon */}
                  <p className="text-gray-600 text-sm">{product.location?.address}</p>
                  <button
                    onClick={() => setIsMapOpen(true)}
                    className="text-sm text-cyan-600 px-2 py-1"
                  >
                    (View on Map)
                  </button>
                </div>
              )}
            </div>

            {/* Section below the address */}
            <div className="flex justify-center items-center bg-white py-1 mt-auto">
              <div className="flex items-center space-x-2 px-6 border-r-2 border-gray-400">
                <FaRegImage className="text-gray-700 w-5 h-5" /> {/* Photos Icon */}
                <span className="text-sm text-gray-800 font-medium">116 Photos</span>
              </div>
              <button
                onClick={handleShortlistToggle}
                className="flex items-center space-x-2 px-6 border-r-2 border-gray-400"
              >
                {isShortlisted ? (
                  <>
                    <FaHeart className="text-red-500 w-5 h-5" /> {/* Filled Heart Icon */}
                    <span className="text-sm text-gray-800 font-medium">Shortlisted</span>
                  </>
                ) : (
                  <>
                    <FaRegHeart className="text-gray-700 w-5 h-5" /> {/* Outline Heart Icon */}
                    <span className="text-sm text-gray-800 font-medium">Shortlist</span>
                  </>
                )}
              </button>
              <div className="flex items-center space-x-2 px-6 border-r-2 border-gray-400">
                <FaPen className="text-gray-700 w-5 h-5" /> {/* Review Icon */}
                <span className="text-sm text-gray-800 font-medium">Write a Review</span>
              </div>
              <div className="flex items-center space-x-2 px-6">
                <FaShareAlt className="text-gray-700 w-5 h-5" /> {/* Share Icon */}
                <span className="text-sm text-gray-800 font-medium">Share</span>
              </div>
            </div>
          </div>

          {/* Dummy Section with Buttons */}
          <div className="max-w-7xl mx-auto mt-[120px] bg-white border">
            <div className="flex gap-4">
              <button className="px-6 py-2 ext-gray-700 rounded">Photos</button>
              <button className="px-6 py-2 text-gray-700 rounded">About</button>
              <button className="px-6 py-2 text-gray-700 rounded">Reviews</button>
            </div>
          </div>

          {/* Additional Photos Section */}
          <div className="max-w-7xl mx-auto bg-white mt-4 p-4 border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold border-b-2 border-pink-600 pb-1">Additional Photos</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {product.all_product_images?.map((img, idx) => (
                <img
                  key={idx}
                  src={`${backendGlobalRoute}/${img.replace(/\\/g, "/")}`}
                  alt={`Product Image ${idx + 1}`}
                  className="rounded"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Contact Card */}
        <div className="lg:w-2/5 w-full p-4 lg:pr-6 space-y-6">
          {/* Price Section */}
          <div className="p-4 bg-white border">
            <div className="text-right text-sm text-gray-600 mb-2">Price</div>
            <div className="space-y-1">
              <div className="flex justify-between text-red-600 font-semibold">
                <span>₹{product.selling_price.toFixed(2)}</span>
              </div>
              {product.display_price && (
                <div className="flex justify-between text-gray-500 line-through">
                  <span>₹{product.display_price.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="p-4 bg-white border">
            <form className="space-y-2 text-sm" onSubmit={handleSubmit}>
              <input
                className="w-full border p-2 rounded"
                placeholder="Full name*"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <div className="flex gap-2">
                <span className="flex items-center border p-2 rounded w-1/4">+91</span>
                <input
                  className="w-3/4 border p-2 rounded"
                  placeholder="Phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <input
                className="w-full border p-2 rounded"
                placeholder="Email address"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                className="w-full border p-2 rounded"
                placeholder="Function date*"
                name="functionDate"
                value={formData.functionDate}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded">
                Check Availability & Prices
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      <Modal
  isOpen={isMapOpen}
  onRequestClose={() => setIsMapOpen(false)}
  className="relative w-[80vw] max-w-4xl h-[70vh] bg-white rounded-lg shadow-lg p-0 overflow-hidden"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
>
  {/* Close Button Inside Top-Right */}
  <div className="absolute top-3 right-3 z-50">
    <button
      onClick={() => setIsMapOpen(false)}
      className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white"
    >
      ✕
    </button>
  </div>

  <div className="flex h-full">
    {/* Map Section */}
    <div className="w-2/3 h-full">
      {locationCoords ? (
        <MapContainer
          center={locationCoords}
          zoom={15}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={locationCoords} icon={customIcon}>
            <Popup>{product.location?.address || "Location"}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          Location data is not available.
        </div>
      )}
    </div>

    {/* Address Section */}
    <div className="w-1/3 bg-white p-6 border-l overflow-y-auto">
      <h3 className="text-xl font-semibold mb-2">{product.product_name}</h3>
      <p className="text-sm text-gray-500">
        {product.location?.address || "Dharam Colony, Palam Vihar, Gurugram, Haryana, India"}
      </p>
    </div>
  </div>
</Modal>


      {/* Description Section */}
      <div className="container mx-auto bg-white mt-7 border p-6 mb-6">
  <h2 className="text-lg font-semibold mb-4">
    About {product.product_name} - {product.category?.category_name || "Category"}
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Product Details */}
    <div className="space-y-4">
      <p className="text-gray-700">{product.description || "No description available."}</p>
      <div className="mt-4 text-sm text-gray-600">
        <h3 className="font-semibold">Location</h3>
        <p>Located in {product.location?.address || "Address not available"}.</p>
      </div>
    </div>

    {/* Vendor Details */}
    {vendor && (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Vendor Details</h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <span className="font-semibold">Name:</span> {vendor.vendor_name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {vendor.vendor_email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {vendor.vendor_phone}
          </p>
        </div>
      </div>
    )}
  </div>
</div>

      {/* Quick Info Grid */}
      <div className="container mx-auto bg-white border p-6">
        <h2 className="text-lg font-semibold mb-4">Product Properties</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
          {product.properties &&
            Object.entries(product.properties).map(([key, value]) => (
              <p key={key}>
                <span className="font-semibold capitalize">{key}:</span> {value}
              </p>
            ))}
        </div>
      </div>

      {/* Review Section */}
      <div className="container mx-auto bg-white mt-4 border p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Reviews for {product.product_name}</h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Rating Breakdown */}
          <div className="w-full md:w-1/3">
    <h3 className="text-sm font-semibold text-gray-700">Rating Breakdown</h3>
    <div className="w-full border-r p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-700">Rating Distribution</h3>
        <div className="flex items-center justify-between">
            <span className="text-green-600 font-bold flex items-center gap-1">
                <span className="bg-green-500 text-white text-xs px-1 py-0.5 rounded-sm">★</span> {averageRating}
            </span>
            <span className="text-xs text-gray-500">{totalReviews} reviews</span>
        </div>
        {[5, 4, 3, 2, 1].map((rating, index) => {
            const percentage = totalReviews > 0 ? (ratingCounts[5 - rating] / totalReviews) * 100 : 0;
            return (
                <div key={index} className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={selectedRatings.includes(rating)}
                        onChange={() => handleRatingFilter(rating)}
                    />
                    <span>{rating} ★</span>
                    <div className="w-2/3 h-2 bg-gray-200 rounded relative">
                        <div
                            className="absolute top-0 left-0 h-2 bg-green-500 rounded"
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                    <span>{ratingCounts[5 - rating]} reviews</span>
                </div>
            );
        })}
        <p className="text-xs text-gray-500 pt-2">Last Review Updated on {new Date().toLocaleDateString()}</p>
    </div>
</div>

          {/* Submit/Edit Review Section */}
          <div className="w-full md:w-2/3">
    <h3 className="font-semibold text-gray-700">{isEditing ? "Edit Your Review" : "Submit Your Review"}</h3>
    <div className="p-4">
        <label className="block mt-2 text-sm font-medium">Rate  {product.product_name}</label>
        <div className="flex gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <input
                    key={i}
                    type="radio"
                    name="rating"
                    value={i + 1}
                    checked={reviewData.rating === i + 1}
                    onChange={(e) => setReviewData({ ...reviewData, rating: parseInt(e.target.value) })}
                    className="w-4 h-4"
                />
            ))}
        </div>
        <textarea
            className="mt-4 w-full border rounded p-2 text-sm"
            rows={4}
            placeholder="Write your review..."
            value={reviewData.reviewContent}
            onChange={(e) => setReviewData({ ...reviewData, reviewContent: e.target.value })}
        ></textarea>
        <input
            type="file"
            className="w-full mt-2 border rounded p-2 text-sm"
            multiple
            onChange={(e) => setReviewData({ ...reviewData, photos: e.target.files })}
        />
        <div className="flex items-center gap-2 mt-4">
            {isEditing ? (
                <button
                    onClick={handleUpdateReview}
                    className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
                >
                    Edit
                </button>
            ) : (
                <button
                    onClick={handleSubmitReview}
                    className="bg-pink-500 text-white px-4 py-2 rounded text-sm"
                >
                    Submit
                </button>
            )}
            {isEditing && (
                <button
                    onClick={() => {
                        setIsEditing(false);
                        setEditingReviewId(null);
                        setReviewData({ rating: 0, reviewContent: "", photos: [] }); // Reset the form
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded text-sm"
                >
                    Cancel
                </button>
            )}
        </div>
    </div>
</div>

        </div>

        {/* Existing Reviews Section */}
        <div className="border-t pt-4">
    <h3 className="font-semibold text-gray-700 mb-4">Customer Reviews</h3>
    {filteredReviews.length > 0 ? (
        filteredReviews.map((review) => (
            <div key={review._id} className="border-t p-4 space-y-2">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    <div className="text-sm font-medium">{review.username}</div>
                    <span className="bg-green-500 text-white text-xs px-1 py-0.5 rounded-sm">
                        ★ {review.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                </div>
                <p className="text-sm text-gray-700">{review.reviewContent}</p>
                {review.photos && review.photos.length > 0 && (
                    <div className="flex gap-2 mt-2">
                        {review.photos.map((photo, index) => (
                            <img
                                key={index}
                                src={`${backendGlobalRoute}/${photo.replace(/\\/g, "/")}`}
                                alt={`Review Photo ${index + 1}`}
                                className="w-16 h-16 object-cover rounded"
                            />
                        ))}
                    </div>
                )}
                {loggedInUser && loggedInUser.id === review.userId?._id && ( // Use review.userId._id for comparison
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => handleEditReview(review)}
                            className="bg-blue-500 text-white px-4 py-1 rounded text-sm"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDeleteReview(review._id)}
                            className="bg-red-500 text-white px-4 py-1 rounded text-sm"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        ))
    ) : (
        <p className="text-sm text-gray-500">No reviews yet for this product.</p>
    )}
</div>

      </div>
    </div>
  );
};

export default SingleProduct;

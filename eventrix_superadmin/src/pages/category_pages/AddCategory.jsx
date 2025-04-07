import React, { useState } from "react";
import axios from "axios";
import backendGlobalRoute from "../../config/config";

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("category_name", categoryName);
    formData.append("description", description);
    if (categoryImage) {
      formData.append("category_image", categoryImage);
    }
  
    try {
      const response = await axios.post(
        `${backendGlobalRoute}/api/add-category`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      alert("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error.response?.data || error);
      setMessage("Error adding category. Please try again.");
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Category</h2>
      {message && <p className="text-green-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryName"
          >
            Category Name
          </label>
          <input
            id="categoryName"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryImage"
          >
            Category Image
          </label>
          <input
            id="categoryImage"
            type="file"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
}

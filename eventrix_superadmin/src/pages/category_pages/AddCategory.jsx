import React, { useState } from "react";
import axios from "axios";
import backendGlobalRoute from "../../config/config";

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [customProperties, setCustomProperties] = useState([]);
  const [message, setMessage] = useState("");

  const [vendorEnabled, setVendorEnabled] = useState(false);
  const [outletEnabled, setOutletEnabled] = useState(false);

  const handleImageChange = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleCustomPropertyChange = (index, key, value) => {
    const updated = [...customProperties];
    updated[index][key] = value;
    setCustomProperties(updated);
  };

  const addPropertyField = () => {
    setCustomProperties([...customProperties, { name: "", type: "text" }]);
  };

  const removePropertyField = (index) => {
    const updated = [...customProperties];
    updated.splice(index, 1);
    setCustomProperties(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredCustomProps = customProperties.filter(
      (prop) => prop.name.trim() !== ""
    );

    const formData = new FormData();
    formData.append("category_name", categoryName);
    formData.append("description", description);
    if (categoryImage) {
      formData.append("category_image", categoryImage);
    }
    formData.append("properties", JSON.stringify(filteredCustomProps));
    formData.append("vendorEnabled", vendorEnabled);
    formData.append("outletEnabled", outletEnabled);

    try {
      const response = await axios.post(
        `${backendGlobalRoute}/api/add-category`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Category added successfully!");
      setMessage("Category added successfully!");
      setCategoryName("");
      setDescription("");
      setCategoryImage(null);
      setCustomProperties([]);
      setVendorEnabled(false);
      setOutletEnabled(false);
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
        {/* Category Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryName">
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

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
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

        {/* Image */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryImage">
            Category Image
          </label>
          <input
            id="categoryImage"
            type="file"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Custom Properties */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Custom Properties
          </label>
          {customProperties.map((prop, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                placeholder="Property Name"
                value={prop.name}
                onChange={(e) =>
                  handleCustomPropertyChange(index, "name", e.target.value)
                }
                className="w-1/2 px-3 py-2 border rounded"
              />
              <select
                value={prop.type}
                onChange={(e) =>
                  handleCustomPropertyChange(index, "type", e.target.value)
                }
                className="w-1/3 px-3 py-2 border rounded"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="boolean">Boolean</option>
              </select>
              <button
                type="button"
                onClick={() => removePropertyField(index)}
                className="text-red-600 font-bold"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addPropertyField}
            className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            + Add Property
          </button>
        </div>

        {/* Vendor & Outlet Checkboxes */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Additional Fields Options
          </label>
          <div className="flex gap-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={vendorEnabled}
                onChange={(e) => setVendorEnabled(e.target.checked)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Enable Vendor Field</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={outletEnabled}
                onChange={(e) => setOutletEnabled(e.target.checked)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Enable Outlet Field</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
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

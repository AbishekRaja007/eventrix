import React, { useEffect, useState } from "react";
import axios from "axios";
import backendGlobalRoute from "../../config/config";

const Servicepage = () => {
  const [categories, setCategories] = useState([]);
  const placeholderImage = "/path-to-your-placeholder-image.jpg"; // Default image if no image is available

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendGlobalRoute}/api/all-categories`);
        console.log("Fetched Categories:", response.data);
        setCategories(response.data);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Top Text */}
        <div className="flex justify-between text-sm uppercase tracking-widest text-gray-700 px-4">
          <span>Explore Our Services</span>
          <span>Texas & Destinations</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-400 my-6"></div>

        {/* Services Section with Vertical Lines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-start">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <div
                key={index}
                className={`flex flex-col items-center text-center ${
                  index !== 0 ? "border-l border-gray-300" : ""
                }`}
              >
                {/* Category Image */}
                <img
                  src={category.image_url ? category.image_url : placeholderImage}
                  alt={category.category_name}
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                />
                
                {/* Category Name */}
                <h2 className="text-xl italic text-gray-700 mt-4">
                  {category.category_name}
                </h2>

                {/* Category Description */}
                <p className="text-gray-600 text-sm mt-2 px-4">
                  {category.description
                    ? category.description
                    : "Provide a summary of your packages right here, and why it's best for them."}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-3">Loading services...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Servicepage;

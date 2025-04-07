import React from "react";
import { useNavigate } from "react-router-dom";

const HomeSection3 = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Top Text */}
        <div className="flex justify-between text-sm uppercase tracking-widest text-gray-700 px-4">
          <span>Explore how we can work together</span>
          <span>Texas & Destinations</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-400 my-6"></div>

        {/* Services Section with Vertical Lines */}
        <div className="grid grid-cols-3 gap-8 items-start">
          {/* Engagement Shoots */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/path-to-your-image/engagement.jpg"
              alt="Engagement Shoots"
              className="w-full h-80 object-cover"
            />
            <h2 className="text-xl italic text-gray-700 mt-4">Engagement Shoots</h2>
            <p className="text-gray-600 text-sm mt-2 px-4">
              Provide a summary of your packages right here, and why it's best for them.
            </p>
          </div>

          {/* Intimate Elopements */}
          <div className="flex flex-col items-center text-center border-l border-gray-300">
            <img
              src="/path-to-your-image/elopements.jpg"
              alt="Intimate Elopements"
              className="w-full h-80 object-cover"
            />
            <h2 className="text-xl italic text-gray-700 mt-4">Intimate Elopements</h2>
            <p className="text-gray-600 text-sm mt-2 px-4">
              Provide a summary of your packages right here, and why it's best for them.
            </p>
          </div>

          {/* For Photographers */}
          <div className="flex flex-col items-center text-center border-l border-gray-300">
            <img
              src="/path-to-your-image/photographers.jpg"
              alt="For Photographers"
              className="w-full h-80 object-cover"
            />
            <h2 className="text-xl italic text-gray-700 mt-4">For Photographers</h2>
            <p className="text-gray-600 text-sm mt-2 px-4">
              Provide a summary of your packages right here, and why it's best for them.
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/services")} // Navigate to /services page
            className="px-6 py-3 border border-gray-600 rounded-full text-gray-800 uppercase text-xs tracking-widest hover:bg-gray-700 hover:text-white transition duration-300"
          >
            Explore Services →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeSection3;

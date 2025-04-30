import React, { useState } from "react";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  return (
    <div className="w-72 min-h-screen bg-gray-800 text-white p-4">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-400"
      />

      {/* Menu Items */}
      <div>
        {/* Example Menu Item 1 */}
        <div>
          <button
            onClick={() => toggleMenu("menu1")}
            className="w-full text-left px-2 py-2 hover:bg-gray-700 rounded"
          >
            Services
          </button>
          {openMenus["menu1"] && (
            <div className="ml-4 mt-1">
              <p className="py-1 hover:text-gray-300 cursor-pointer">Venues</p>
              <p className="py-1 hover:text-gray-300 cursor-pointer">Makeup</p>
              <p className="py-1 hover:text-gray-300 cursor-pointer">Decoration</p>
            </div>
          )}
        </div>

        {/* Example Menu Item 2 */}
        <div className="mt-2">
          <button
            onClick={() => toggleMenu("menu2")}
            className="w-full text-left px-2 py-2 hover:bg-gray-700 rounded"
          >
            Products
          </button>
          {openMenus["menu2"] && (
            <div className="ml-4 mt-1">
              <p className="py-1 hover:text-gray-300 cursor-pointer">Add Product</p>
              <p className="py-1 hover:text-gray-300 cursor-pointer">Manage Products</p>
            </div>
          )}
        </div>

        {/* Add more menus similarly */}
      </div>
    </div>
  );
};

export default Sidebar;

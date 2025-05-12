import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import backendGlobalRoute from "../../config/config";

const Sidebar = ({ onFilterChange }) => {
  const { categoryId } = useParams();
  const [sidebarData, setSidebarData] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!categoryId) return;
    axios
      .get(`${backendGlobalRoute}/api/sidebar/${categoryId}`)
      .then((res) => setSidebarData(res.data))
      .catch((err) => console.error("Sidebar fetch error:", err));
  }, [categoryId]);

  // Emit generic filters (checkboxes/buttons) and search
  const handleFilterChange = (property, value) => {
    setFilters((prev) => {
      const current = prev[property] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      const next = { ...prev, [property]: updated };
      onFilterChange?.(next);
      return next;
    });
  };

  const handleSearchChange = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    onFilterChange?.({ ...filters, search: q.toLowerCase() });
  };

  if (!sidebarData) return <aside className="p-4">Loading...</aside>;

  const { propertyValues = {}, displayTypes = {}, locations = [] } =
    sidebarData;

  return (
    <aside className="w-full md:w-80 bg-[#EAE8E1] p-4 space-y-4">
      <h3 className="text-xl font-semibold">Filter Services</h3>

      {/* Free-text search */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full p-2 rounded border"
      />

      {/* Other filters... */}
      {Object.entries(propertyValues).map(([prop, values]) => {
        const type = displayTypes[prop] || "text";
        return (
          <div key={prop}>
            <h4 className="font-medium capitalize">{prop}</h4>
            {type === "checkbox" ? (
              values.map((v) => (
                <label key={v} className="block">
                  <input
                    type="checkbox"
                    checked={(filters[prop] || []).includes(v)}
                    onChange={() => handleFilterChange(prop, v)}
                  />{" "}
                  {v}
                </label>
              ))
            ) : (
              <div className="flex flex-wrap gap-2">
                {values.map((v) => (
                  <button
                    key={v}
                    onClick={() => handleFilterChange(prop, v)}
                    className={`px-3 py-1 rounded border ${
                      (filters[prop] || []).includes(v)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Location filters... same pattern */}
      {locations.length > 0 && (
        <div>
          <h4 className="font-medium">Location</h4>
          <div className="flex flex-wrap gap-2">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => handleFilterChange("location", loc)}
                className={`px-3 py-1 rounded border ${
                  (filters.location || []).includes(loc)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

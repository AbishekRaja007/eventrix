import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import backendGlobalRoute from "../../config/config";
import "./ServicePage.css";

// New helper component for tag‐list with “show more”
const TagList = ({ tags }) => {
  const [expanded, setExpanded] = useState(false);
  if (!tags || tags.length === 0) return null;

  const limit = 5;
  const visibleTags = expanded ? tags : tags.slice(0, limit);
  const hiddenCount = tags.length - limit;

  return (
    <>
      
  <ul className="project__tags flex-group" role="list">
    {visibleTags.map((tag, i) => (
      <li key={i} className="project__tag">
        {tag}
      </li>
    ))}

    {!expanded && hiddenCount > 0 && (
      <li
        className="project__tag cursor-pointer"
        onClick={() => setExpanded(true)}
      >
        +{hiddenCount}
      </li>
    )}

    {expanded && tags.length > limit && (
      <li
        className="project__tag project__tag--showless cursor-pointer"
        onClick={() => setExpanded(false)}
      >
        Show less
      </li>
    )}
  </ul>
    </>
  );
};

const ServicePages = () => {
  const [categories, setCategories] = useState([]);
  const placeholderImage = "/path-to-your-placeholder-image.jpg";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${backendGlobalRoute}/api/all-categories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section>
      <div className="projects container">
        <h2 className="section-title">Explore Our Services</h2>

        {categories.length > 0 ? (
          categories.map((category) => (
            <article className="project" key={category._id}>
              <div className="project__img-container">
                <img
                  className="project__img"
                  src={
                    category.category_image
                      ? `${backendGlobalRoute}/${category.category_image.replace(
                          /\\/g,
                          "/"
                        )}`
                      : placeholderImage
                  }
                  alt={category.category_name}
                />
              </div>

              <div className="project__content grid-flow">
                <h3 className="project__title">
                  {category.category_name}
                </h3>

                {/* Dynamically fetched tags, capped at 5 with “+N” toggler */}
                <TagList tags={category.tags} />

                <p>
                  {category.description ||
                    "Provide a summary of your packages right here, and why it's best for them."}
                </p>

                <Link
                  className="project__cta"
                  to={`/category/${category._id}`}
                >
                  View Service
                </Link>

              </div>
            </article>
          ))
        ) : (
          <p className="text-center text-gray-600">Loading services...</p>
        )}
      </div>
    </section>
  );
};

export default ServicePages;

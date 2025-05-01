import React from "react";
import Sidebar from "../common_pages/Sidebar"; // Adjust path if necessary
import "./CategoryProductpage.css";

const DeveloperToolsCard = () => {
  return (
    <div className="flex">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div className="flex-1 p-4">
        <a
          className="card"
          href="https://dev.to/dostonnabotov/ultimate-tools-for-developers-2aj2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="card__img-container">
            <img
              className="card__img"
              src="//unsplash.it/1200"
              alt="Unsplash random image"
            />
          </div>
          <div className="card__content">
            <h3 className="card__title">Ultimate Tools for Developers</h3>
            <p>
              Let me introduce you to this community-driven list of awesome tools for
              developers.
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default DeveloperToolsCard;

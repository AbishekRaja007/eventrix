import React from "react";

const HomeSection1 = () => {
  return (
    <div className="p-2">
      <div className="relative w-[calc(100%-4px)] h-screen mx-auto">
        {/* Background Image */}
        <img
          src="/path-to-your-image/image.png"
          alt="Wedding Couple"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-7xl font-serif">Hailey <i>James</i></h1>
          <p className="text-sm tracking-wide mt-2">
            ENGAGEMENT & ELOPEMENT PHOTOGRAPHER
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeSection1;

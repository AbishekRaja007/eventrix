import React from "react";

const HomeSection4 = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20 flex flex-col md:flex-row items-center gap-8">
      {/* Left Image */}
      <div className="w-full md:w-1/2">
        <img
          src="/path-to-your-image-left.jpg"
          alt="Left Image"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
      
      {/* Text Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
        <h2 className="text-4xl font-bold text-gray-800">I'M HAILEY JAMES</h2>
        <p className="text-sm uppercase tracking-widest text-gray-500 mt-2">
          A PHOTOGRAPHER SPECIALIZING IN THOSE INTIMATE MOMENTS WITH YOUR PARTNER
        </p>
        <p className="text-gray-700 mt-4 leading-relaxed">
          Introduce yourself! Through the lens of our photography website template, 
          your portfolio blossoms into a garden of mesmerizing visuals, capturing 
          the essence of the world around us. Your passion for photography finds a 
          nurturing home here, and your stories find a canvas to unfold.
        </p>
        <p className="text-gray-700 mt-4 leading-relaxed">
          Let the lens capture the extraordinary in the ordinary, the ethereal in 
          the mundane, and the timeless in the ephemeral. Let your artistry roam 
          free and your images tell the tales that words cannot express.
        </p>
      </div>
      
      {/* Right Small Images */}
      <div className="w-full md:w-auto flex flex-col gap-4">
        <img
          src="/path-to-your-image-top-right.jpg"
          alt="Top Right Image"
          className="w-32 h-32 rounded-lg shadow-lg object-cover"
        />
        <img
          src="/path-to-your-image-bottom-right.jpg"
          alt="Bottom Right Image"
          className="w-32 h-32 rounded-lg shadow-lg object-cover"
        />
      </div>
    </section>
  );
};

export default HomeSection4;

import React from "react";

const HomeSection8 = () => {
  return (
    <div className=" p-2 ">
        <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-start">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/images/your-image.jpg" // Replace with actual path
          alt="Romantic Wedding Moment"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 max-w-3xl px-6 lg:px-20">
        <h2 className="text-white text-4xl md:text-5xl font-serif leading-tight">
          Ready To Capture Those{" "}
          <span className="italic">Special Moments?</span>
        </h2>

        {/* CTA Button */}
        <button className="mt-6 px-6 py-3 text-white border border-white rounded-full text-sm tracking-wide hover:bg-white hover:text-black transition">
          BOOK YOUR SESSION
        </button>
      </div>
    </section>
    </div>
  );
};

export default HomeSection8;

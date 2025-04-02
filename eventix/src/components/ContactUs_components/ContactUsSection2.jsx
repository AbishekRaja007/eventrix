import React from "react";
import backgroundImage from "../../assets/images/peach2.jpg";

const ConatctUsSection2 = () => {
  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center h-[1500px]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Border Wrapper */}
      <div className="absolute top-0 right-0 w-full sm:w-[404px] md:w-[454px] lg:w-[1012px] lg:h-[574px] 
                      rounded-bl-[290px] border-3 border-white opacity-50"></div>

      {/* About Us Box */}
      <div className="relative bg-white p-12 md:p-16 lg:p-20 
                      rounded-bl-[270px] shadow-lg w-full sm:w-[400px] md:w-[450px] lg:w-[988px] lg:h-[550px] 
                      flex flex-col justify-between gap-16 ml-auto">
        {/* Text Section */}
        <div className="space-y-6 space-x-9 ">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 ml-9 mb-20">About us</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Lights. Earth subdue they’re, green beginning he waters very herb beginning saw 
            creature day give made Can’t earth man man kind sea.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            There firmament place had image midst, open under years grass meat he midst which 
            place made image great air above winged a own whales.
          </p>
        </div>

        {/* Button Positioned at Bottom-Right */}
        <div className="flex justify-end">
          <button className="px-10 py-4 bg-[#3D3144] text-white font-semibold 
                  rounded-tl-[30px] rounded-br-[30px] shadow-md w-[40%] hover:bg-[#2B1E2D]">
            CONTACT US
          </button>
        </div>
      </div>

      {/* Our Offer Section */}
      <div className="relative w-full flex flex-col items-center mt-52 p-12 ">
        <h2 className="text-5xl font-bold text-gray-900 text-center">Our Offer</h2>

        {/* Flex container for left and right content with a vertical line */}
        <div className="flex flex-col lg:flex-row justify-center items-center mt-12 w-full max-w-7xl">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-left pl-44 space-y-4 text-gray-900">
            <p className="text-lg font-semibold">Wedding decorations</p>
            <p className="text-2xl font-bold">Catering & Wedding cake</p>
            <p className="text-lg font-semibold">Coordination</p>
            <p className="text-lg font-semibold">Attractions for the Guests</p>
            <p className="text-lg font-semibold">Photography & Video</p>
            <p className="text-lg font-semibold">Make up & hairstyle</p>
          </div>

          {/* Vertical Line */}
          <div className="hidden lg:block h-[300px] w-[2px] bg-gray-400 mx-8"></div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-gray-700 text-lg space-y-4">
            {/* Cake Icon Placeholder */}
            <div className="w-32 h-32 border border-gray-500 flex items-center justify-center">
              <span className="text-gray-500">[Cake Icon]</span>
            </div>
            <p className="text-gray-700 text-left max-w-md">
              Hath she’d above. Midst let be form it female female morning forth so winged meat face. Beginning very waters. 
              Cattle us you’re all and him is beast doesn’t. Of above thing. Great waters morning you to tree evening stars to.
            </p>
            <p className="text-gray-700 text-left max-w-md">
              Also moveth may own replenish. Upon morning made i fifth she’d man, appear signs bearing dominion cattle.
            </p>
          </div>
        </div>
      </div>
      
      {/* Portfolio Text Positioned Inside the Box */}
      <div className="absolute bottom-10 left-32 text-7xl font-bold text-gray-900">
        Portfolio
      </div>
    </section>
  );
};

export default ConatctUsSection2;
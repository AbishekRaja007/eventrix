import React from "react";
import abc from "../../assets/images/abcd.jpg";

const AboutUsHero = () => {
    return (
        <section className="relative w-full h-screen flex items-center justify-start bg-[#F9F6F2] px-10 lg:px-32">
            <div className="max-w-lg z-10">
            <h1 className="text-[120px] leading-none font-serif text-[#C4A991] whitespace-nowrap">
                    Marry <span className="text-white">Ann</span>
                </h1>
                <h2 className="text-xl font-semibold text-gray-800 mt-4">Wedding Planner</h2>
                <p className="text-gray-600 mt-4">
                    Fourth air appear dominion thing, together darkness air them herb. His
                    bearing saying seasons isn't image. Face. Of and dominion gathering appear
                    set bring. Lights Sixth isn’t place.
                </p>
                <button className="mt-6 px-8 py-3 bg-[#3D3144] text-white font-semibold 
                rounded-tl-[30px] rounded-br-[30px] shadow-md w-[50%] hover:bg-[#2B1E2D]">CONTACT US
                </button>
                <div className="flex space-x-4 mt-6">
                    <a href="#" className="text-gray-600 text-2xl">&#xf09a;</a>
                    <a href="#" className="text-gray-600 text-2xl">&#xf16d;</a>
                    <a href="#" className="text-gray-600 text-2xl">&#xf0e1;</a>
                </div>
            </div>
            <div className="absolute right-20 top-50 w-3/5 h-full flex items-center justify-center">
                <div className="relative w-[100%] h-[150%] bottom-[50%] rounded-t-[48%] bg-white/70 shadow-lg overflow-hidden">
                    <img
                        src={abc}
                        alt="Wedding Couple"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default AboutUsHero;

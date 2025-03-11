import { useState, useEffect } from "react";

const HomeSection9 = ({ isLoggedIn }) => {
  if (isLoggedIn) return null;

  return (
    <section className="bg-[#FAF8F4] py-12 px-6 flex flex-col items-center text-center">
      <h2 className="text-4xl font-serif text-gray-800">JOIN THE LIST</h2>
      <p className="italic text-gray-600 mt-2">
        Sign up to receive my free elopement preparation checklist!
      </p>
      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <input
          type="email"
          placeholder="EMAIL ADDRESS"
          className="border border-gray-400 py-2 px-4 w-80 text-gray-700 focus:outline-none"
        />
        <button className="bg-[#F8F6F2] text-gray-800 py-2 px-6 border border-gray-400 hover:bg-gray-200">
          SIGN UP
        </button>
      </div>
      <div className="flex justify-between w-full max-w-4xl mt-12 text-gray-700">
        <div className="text-left">
          <h3 className="text-sm tracking-widest font-bold">NAVIGATE</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li>HOME</li>
            <li>ABOUT</li>
            <li>SERVICES</li>
            <li>GALLERY</li>
            <li>CONTACT</li>
          </ul>
        </div>
        <div className="text-right">
          <h3 className="text-sm tracking-widest font-bold">CONNECT</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li>BOOK A SESSION</li>
            <li>EMAIL HAILEY</li>
            <li>CLIENT PORTAL</li>
          </ul>
          <div className="flex gap-4 mt-4 text-xl">
            <i className="fab fa-instagram"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-tiktok"></i>
            <i className="fab fa-pinterest"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection9;

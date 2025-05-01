import React from "react";

const Header = () => {
  return (
    <header className="fixed top-[20px] left-0 w-full h-[0px] bg-transparent font-bold text-black z-50 ">
      <div className=" w-[1400px] mx-auto flex justify-start items-center">
        {/* Logo and Title */}
        <h1 className="text-5xl font-serif uppercase">
          <span className="text-yellow-400">Eventri</span>
          <span className="text-black">x</span>
        </h1>

        {/* Navbar */}
        <nav className="ml-auto">
          <ul className="flex gap-6 text-lg">
            <li>
              <a className="hover:text-yellow-400 transition" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="hover:text-yellow-400 transition" href="/Aboutus">
                About Us
              </a>
            </li>
            <li>
              <a className="hover:text-yellow-400 transition" href="/contact-us">
                Contact Us
              </a>
            </li>
            <li className="relative group">
              <a
                className="hover:text-yellow-400 transition cursor-pointer"
            
              >
                Account
              </a>
              <ul className="absolute left-0 hidden  w-28 bg-white text-black shadow-lg group-hover:block rounded-[10px]">
                <li>
                  <a
                    className="block px-4 py-2 hover:bg-gray-200 rounded-[10px]"
                    href="/login"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a className="block px-4 py-2 hover:bg-gray-200 rounded-[10px]" href="/register">
                    Sign Up
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

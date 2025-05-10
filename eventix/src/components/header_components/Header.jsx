import React, { useContext } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaPinterestP,
} from "react-icons/fa";
import { AuthContext } from "../../components/common_components/AuthContext"; // Import AuthContext

const Header = () => {
  const { user, logout } = useContext(AuthContext); // Access user and logout from AuthContext

  return (
    <header className="w-full absolute top-2 left-0 z-50 bg-transparent text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Social Icons */}
        <div className="flex items-center space-x-4 text-white text-lg">
          <FaInstagram />
          <FaFacebookF />
          <FaTiktok />
          <FaPinterestP />
        </div>

        {/* Center: Navigation Links */}
        <nav className="flex-1 flex justify-center items-center space-x-8 text-white text-sm tracking-widest font-medium left-5">
          <a href="#blog" className="hover:text-gray-300">BLOG</a>
          <a href="/contact-us" className="hover:text-gray-300">CONTACT</a>
          <a href="/Aboutus" className="hover:text-gray-300">ABOUT</a>
        </nav>

        {/* Right: Book Button and Account */}
        <div className="flex items-center space-x-4">
          <a
            href="/services"
            className="border border-white text-sm tracking-widest px-8 py-3 rounded-full hover:text-black hover:bg-white transition duration-300"
          >
            BOOK YOUR SESSION
          </a>
          <div className="relative group">
            {user ? (
              <div className="relative">
                <span className="cursor-pointer">{user.name}</span>
                <button
                  onClick={logout}
                  className="absolute left-0 hidden group-hover:block bg-white text-black text-sm px-4 py-2 rounded shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <button className="cursor-pointer">ACCOUNT</button>
                <ul className="absolute left-0 hidden group-hover:block bg-transparent text-white text-left rounded-md shadow-lg min-w-[140px] z-50">
                  <li>
                    <a className="block px-4 py-2 rounded-t-md" href="/login">
                      Login
                    </a>
                  </li>
                  <li>
                    <a
                      className="block px-4 py-2 hover:text-gray-400 rounded-b-md"
                      href="/register"
                    >
                      Sign Up
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


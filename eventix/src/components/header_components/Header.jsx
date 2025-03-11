import React from "react";

const Header = () => {
  return (
    <div className="flex justify-around items-center p-2">
      <div>
        <a className="text-2xl font-bold" href="/home">
          LOGO
        </a>
      </div>

      <div className="flex ">
        <input
          type="search"
          className="border  rounded-5 p-2"
          placeholder="search"
        />
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <a
              className="nav-link text-cyan-700 hover:text-cyan-900 font-semibold hover:underline transition-all 0.5"
              aria-current="page"
              href="/contact-us"
            >
              Contact
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-cyan-700 hover:text-cyan-900 font-semibold hover:underline transition-all 0.5"
              href="/about-us"
            >
              About
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-cyan-700 hover:text-cyan-900 font-semibold hover:underline transition-all 0.5"
              href="/all-blogs"
            >
              Blogs
            </a>
          </li>
        </ul>
      </div>

      <div>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <a
              className="nav-link text-cyan-700 hover:text-cyan-900 font-semibold hover:underline transition-all 0.5"
              aria-current="page"
              href="/login"
            >
              login
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-cyan-700 hover:text-cyan-900 font-semibold hover:underline transition-all 0.5"
              href="/register"
            >
              Register
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="flex p-5 justify-evenly bg-gray-100 flex-wrap">
        <ul className="nav flex-column ">
          <li className="nav-item">
            <a className="nav-link text-gray-800 font-bold" href="#">
              Web Links
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-gray-800" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-gray-800" href="/contact-us">
              Contact
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-gray-800" href="/about-us">
              About Us
            </a>
          </li>
        </ul>

        <ul className="nav flex-column ">
          <li className="nav-item">
            <a className="nav-link text-gray-800 font-bold" href="#">
              Social Links
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-gray-800"
              href="https://facebook.com"
              target="_blank"
            >
              Facebook
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-gray-800"
              href="https://twitter.com"
              target="_blank"
            >
              Twitter
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-gray-800"
              href="https://linkedin.com"
              target="_blank"
            >
              LinkedIn
            </a>
          </li>
        </ul>

        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link text-gray-800 font-bold" href="#">
              Links
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-gray-800" href="#" target="_blank">
              Privacy Policy
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-gray-800" href="#" target="_blank">
              Return Policy
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-gray-800" href="#" target="_blank">
              Terms And Conditions
            </a>
          </li>
        </ul>

        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link text-gray-800 font-bold" href="#">
              Address
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-gray-800" href="#">
              ECODERS - #198
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-gray-800" href="#">
              Hesaraghatta Road, Bagalgunte
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-gray-800">Bangalore</a>
          </li>
        </ul>
      </div>

      <p className="bg-gray-900 text-light p-3 text-center">
        copyright &copy; &rarr; ecoders Bangalore
      </p>
    </div>
  );
};

export default Footer;

import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import { useNavigate } from "react-router-dom";

function Footer() {
  const { mode } = useContext(myContext);
  const navigate = useNavigate();

  // Scroll-to-top handler for Home button
  const handleHomeClick = () => {
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  };

  const linkStyle = { color: mode === "dark" ? "#ffffff" : "#4a5568" };

  return (
    <footer
      style={{
        backgroundColor: mode === "dark" ? "#2e3137" : "#f3f4f6",
        color: mode === "dark" ? "#e5e7eb" : "#4a5568",
      }}
    >
      <div className="container mx-auto px-5 py-24">
        <div className="flex flex-wrap text-center md:text-left">
          {/* Categories Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2
              className="title-font font-medium tracking-widest text-sm mb-3 uppercase"
              style={linkStyle}
            >
              Categories
            </h2>
            <nav className="list-none">
              <li>
                <button
                  onClick={handleHomeClick}
                  className="block mb-2 hover:underline"
                  style={linkStyle}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/order")}
                  className="block mb-2 hover:underline"
                  style={linkStyle}
                >
                  Order
                </button>
              </li>
              <li>
                <button
                  onClick={handleHomeClick}
                  className="block mb-2 hover:underline"
                  style={linkStyle}
                >
                  Local For Vocal
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/cart")}
                  className="block hover:underline"
                  style={linkStyle}
                >
                  Cart
                </button>
              </li>
            </nav>
          </div>

          {/* Customer Service Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2
              className="title-font font-medium tracking-widest text-sm mb-3 uppercase"
              style={linkStyle}
            >
              Customer Service
            </h2>
            <nav className="list-none">
              <li>
                <button
                  onClick={() => navigate("/returnpolicy")}
                  className="block mb-2 hover:underline"
                  style={linkStyle}
                >
                  Return Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/about")}
                  className="block mb-2 hover:underline"
                  style={linkStyle}
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/contact")}
                  className="block hover:underline"
                  style={linkStyle}
                >
                  Contact Us
                </button>
              </li>
            </nav>
          </div>

          {/* Services Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2
              className="title-font font-medium tracking-widest text-sm mb-3 uppercase"
              style={linkStyle}
            >
              Services
            </h2>
            <nav className="list-none">
              <li>
                <button
                  onClick={() => navigate("/privacypolicy")}
                  className="block hover:underline"
                  style={linkStyle}
                >
                  Privacy Policy
                </button>
              </li>
            </nav>
          </div>

          {/* Payment Methods Section */}
          <div className="w-full md:w-1/4">
            <h2
              className="title-font font-medium tracking-widest text-sm mb-3"
              style={linkStyle}
            >
              We Accept
            </h2>
            <img
              src="https://ecommerce-sk.vercel.app/pay.png"
              alt="Payment Methods"
              className="mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div
        style={{
          backgroundColor: mode === "dark" ? "#37393d" : "#e5e7eb",
          color: mode === "dark" ? "#e5e7eb" : "#4a5568",
        }}
      >
        <div className="container mx-auto px-5 py-4 flex flex-col sm:flex-row items-center">
          <button
            onClick={handleHomeClick}
            className="flex items-center mb-2 sm:mb-0"
            style={linkStyle}
          >
            <span className="text-2xl font-bold">E-Bharat</span>
          </button>
          <p className="text-sm ml-0 sm:ml-4">
            © 2025 E-Bharat —
            <a
              href="https://www.ebharat.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 hover:underline"
              style={linkStyle}
            >
              www.ebharat.com
            </a>
          </p>
          <span className="inline-flex sm:ml-auto mt-2 sm:mt-0">
            {/* Social Icons (optional) */}
            <a href="#" className="ml-3 text-gray-500 hover:text-gray-700">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="#" className="ml-3 text-gray-500 hover:text-gray-700">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a href="#" className="ml-3 text-gray-500 hover:text-gray-700">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
              </svg>
            </a>
            <a href="#" className="ml-3 text-gray-500 hover:text-gray-700">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                <circle cx={4} cy={4} r={2} />
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

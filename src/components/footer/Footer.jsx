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
      <div className="container mx-auto px-5 py-20">
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
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/contact")}
                  className="block hover:underline"
                  style={linkStyle}
                >
                  Contact
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
        <div className="container mx-auto px-5 py-4 flex flex-col sm:flex-row items-center justify-center">
          <span className="flex items-center mb-2 sm:mb-0 mr-2" style={linkStyle}>
            Made with ❤️ by
          </span>
          <a
            href="https://www.linkedin.com/in/rashmika-autha"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={linkStyle}
          >
            Autha Rashmika
          </a>
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;

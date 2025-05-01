// src/components/HeroSlider.jsx
import React, { useState, useEffect, useRef } from "react";

const slides = [
  "https://i.pinimg.com/736x/3f/cb/5e/3fcb5e8aab3b26e58763010753a9f0d3.jpg",
  "https://i.pinimg.com/736x/81/a2/84/81a284546393486d938087333b3060a6.jpg",
  "https://i.pinimg.com/736x/1f/5f/01/1f5f01a25417a7051ba481e3a9208365.jpg",
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 5000; // 5s auto-play

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1)),
      delay
    );
    return () => resetTimeout();
  }, [current]);

  const prevSlide = () =>
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  const nextSlide = () =>
    setCurrent(current === slides.length - 1 ? 0 : current + 1);

  // Smooth scroll to filter section
  const scrollToFilter = () => {
    const el = document.getElementById("filter-section");
    if (el) {
      const yOffset = -80; // adjust for fixed headers
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((url, idx) => (
          <div key={idx} className="min-w-full h-full">
            <img
              src={url}
              alt={`slide-${idx}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Overlay Text */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
          Shop Smarter, Live Better
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl">
          Discover the best deals across electronics, fashion, home essentials
          and more.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={scrollToFilter}
            className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition"
          >
            Start Shopping
          </button>
          <a
            href="/products#filter-section"
          >
            
          </a>
          
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === current ? "bg-pink-500" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

import React from 'react'
import { Link } from 'react-router-dom'

function NoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-md text-center">
        {/* Shopping-themed GIF with bounce animation */}
        <img
          src="https://media.giphy.com/media/13UZisxBxkjPwI/giphy.gif"
          alt="Shopping cart animation"
          className="w-64 h-64 mx-auto mb-6"
        />
        <h1 className="text-6xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          Oops! The page you're looking for isn't in stock.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          🛒 Back to Shopping
        </Link>
      </div>
    </div>
  )
}

export default NoPage;

import React from "react";
import { FaFacebook } from "react-icons/fa";


const Posts = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
        <h1 className="flex items-center space-x-2 font-bold mb-[1rem] md:text-2xl"><span><FaFacebook /></span><span>Latest Post</span></h1>
      {/* Grid of Post Placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 21 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-300 opacity-50 h-48 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>

      {/* Buttons Section */}
      <div className="flex justify-center items-center gap-4 mt-6 text-sm md:text-base">
        <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">
          Load More
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition">
          <span className="text-lg">📷</span> Follow on Instagram
        </button>
      </div>
    </div>
  );
};

export default Posts;

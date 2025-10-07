import React from "react";
import co_curriculumManagement_img from "../../../assets/images/administration/co-curr.jpeg";

const CoCurriculumPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-1 w-12 bg-yellow-400 rounded"></div>
            <span className="text-yellow-400 font-medium tracking-wide">
              ADMINISTRATION
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Co-Curriculum Management
          </h1>
          <p className="text-blue-100 text-lg">
            Organizational Structure & Leadership Team
          </p>
        </div>
      </div>

      {/* Main Content - Organizational Chart (80% of content) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Chart Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h2 className="text-2xl font-bold text-white text-center">
              Carta Organisasi Majlis Kokurikulum 2025
            </h2>
            <p className="text-purple-100 text-center mt-2">
              Co-Curriculum Council Organizational Chart 2025
            </p>
          </div>

          {/* Chart Container */}
          <div className="p-8">
            <div className="w-full overflow-x-auto">
              <div className="min-w-full flex justify-center">
                <img
                  src={co_curriculumManagement_img}
                  alt="Carta Organisasi Majlis Kokurikulum 2025 - Co-Curriculum Council Organizational Chart"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                  style={{ maxHeight: "85vh" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supporting Information Section (20% of content) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Key Areas Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">
                Key Areas
              </h3>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Uniform Bodies</li>
              <li>• Academic Clubs</li>
              <li>• Sports & Games</li>
              <li>• Student Houses</li>
            </ul>
          </div>

          {/* Leadership Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-pink-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">
                Leadership
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Structured leadership development through various councils and
              committees.
            </p>
          </div>

          {/* Programs Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">
                Programs
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Comprehensive co-curricular programs designed for holistic
              development.
            </p>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">
                Get Involved
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Join our co-curricular activities and be part of our vibrant
              school community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoCurriculumPage;

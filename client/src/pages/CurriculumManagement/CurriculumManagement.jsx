import React from "react";

import curriculumManagement_img from "../../assets/images/administration/curriculum_management.jpeg";

const CurriculumManagementPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
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
            Curriculum Management
          </h1>
          <p className="text-blue-100 text-lg">
            Ensuring quality education delivery
          </p>
        </div>
      </div>

      {/* Main Content - Organizational Chart (80% of content) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Chart Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-700 px-8 py-6">
            <h2 className="text-2xl font-bold text-white text-center">
              Carta Organisasi Jawatankuasa Kurikulum 2025
            </h2>
            <p className="text-blue-100 text-center mt-2">
              Curriculum Committee Organizational Chart 2025
            </p>
          </div>

          {/* Chart Container */}
          <div className="p-8">
            <div className="w-full overflow-x-auto">
              <div className="min-w-full flex justify-center">
                <img
                  src={curriculumManagement_img}
                  alt="Carta Organisasi Jawatankuasa Kurikulum 2025 - Curriculum Committee Organizational Chart"
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
          {/* Academic Departments Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
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
                Core Subjects
              </h3>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Bahasa Malaysia</li>
              <li>• English Language</li>
              <li>• Mathematics</li>
              <li>• Science</li>
              <li>• History</li>
            </ul>
          </div>

          {/* Assessment & Evaluation Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-cyan-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">
                Assessment
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Comprehensive evaluation and assessment programs to monitor
              student progress and curriculum effectiveness.
            </p>
          </div>

          {/* Specialized Programs Card */}
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">
                Special Programs
              </h3>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• STEM Education</li>
              <li>• Islamic Studies</li>
              <li>• Visual Arts</li>
              <li>• Technical & Vocational</li>
            </ul>
          </div>

          {/* Professional Development Card */}
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">
                Development
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Continuous professional development and training programs for
              educators to enhance curriculum delivery.
            </p>
          </div>
        </div>

        {/* Additional Information Bar */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Curriculum Excellence</h3>
          <p className="text-blue-100">
            Our curriculum management structure ensures quality education
            delivery through systematic planning, implementation, and continuous
            improvement across all academic disciplines.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurriculumManagementPage;

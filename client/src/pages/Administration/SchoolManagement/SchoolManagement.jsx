import React from "react";

import school_management_img from "../../../assets/images/administration/school_management1.jpeg";
import schoool_management_img2 from "../../../assets/images/administration/school_management2.jpeg";

const SchoolManagementPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
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
            School Management
          </h1>
          <p className="text-blue-100 text-lg">
            Organizational Structure & Leadership Team
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">       

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
          {/* Chart Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <h3 className="text-2xl font-bold text-center">
              SMK SURIA PERDANA KEMENTERIAN PENDIDIKAN MALAYSIA
            </h3>
          </div>

          {/* Chart Image */}
          <div className="p-8">
            <div className="relative bg-gray-50 rounded-xl overflow-hidden">
              <img
                src={school_management_img}
                alt="SMK Suria Perdana Organizational Chart"
                className="w-full h-auto object-contain max-h-screen"
              />

              {/* Interactive Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-gray-800 font-medium">
                    Click to view full organizational structure
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
          {/* Chart Image */}
          <div className="p-8">
            <div className="relative bg-gray-50 rounded-xl overflow-hidden">
              <img
                src={schoool_management_img2}
                alt="SMK Suria Perdana Organizational Chart"
                className="w-full h-auto object-contain max-h-screen"
              />

              {/* Interactive Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-gray-800 font-medium">
                    Click to view full organizational structure
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolManagementPage;

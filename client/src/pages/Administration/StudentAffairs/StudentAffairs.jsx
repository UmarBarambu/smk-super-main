import React from "react";

import student_affairs_img from "../../../assets/images/administration/student-affair.jpeg";
import kokurikulum_img from "../../../assets/images/administration/kokurikulum.png";
import pengurusan_img from "../../../assets/images/administration/pengurusan.png";

const StudentAffairsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
            Student Affairs
          </h1>
          <p className="text-blue-100 text-lg">
            Enhancing students learning, developement and success
          </p>
        </div>
      </div>

      {/* Main Content - Organizational Chart and Others*/}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Chart Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
            <h2 className="text-2xl font-bold text-white text-center">
              Organizational Structure 2025
            </h2>
          </div>

          {/* Chart Container */}
          <div className="p-8">
            <div className="w-full overflow-x-auto">
              <div className="min-w-full flex justify-center">
                <img
                  src={student_affairs_img}
                  alt="Carta Organisasi Hal Ehwal Murid 2025 - Student Affairs Organizational Chart"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                  style={{ maxHeight: "80vh" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Chart Container */}
          <div className="p-8">
            <div className="w-full overflow-x-auto">
              <div className="min-w-full flex justify-center">
                <img
                  src={pengurusan_img}
                  alt="Carta Organisasi Hal Ehwal Murid 2025 - Student Affairs Organizational Chart"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                  style={{ maxHeight: "80vh" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Chart Container */}
          <div className="p-8">
            <div className="w-full overflow-x-auto">
              <div className="min-w-full flex justify-center">
                <img
                  src={kokurikulum_img}
                  alt="Carta Organisasi Hal Ehwal Murid 2025 - Student Affairs Organizational Chart"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                  style={{ maxHeight: "80vh" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StudentAffairsPage;

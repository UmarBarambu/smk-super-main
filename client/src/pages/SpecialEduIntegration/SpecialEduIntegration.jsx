import React from "react";
import { Users, Mail, Phone, FileText, Calendar, Award } from "lucide-react";
import specialEduInt_img from "../../assets/images/administration/special-edu-int.jpeg";

const SEIPManagement = () => {
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
            SEIP MANAGEMENT
          </h1>
          <p className="text-blue-100 text-lg">
            Providing inclusive education opportunities
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content - Organizational Chart (80% of content) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Chart Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-700 px-8 py-6">
              <h2 className="text-2xl font-bold text-white text-center">
                Carta Organisasi Pengurusan Program Pendidikan Khas Integrasi
                2025
              </h2>
              <p className="text-blue-100 text-center mt-2">
                SEIP Organizational Chart 2025
              </p>
            </div>

            {/* Chart Container */}
            <div className="p-8">
              <div className="w-full overflow-x-auto">
                <div className="min-w-full flex justify-center">
                  <img
                    src={specialEduInt_img}
                    alt="Carta Organisasi Jawatankuasa Kurikulum 2025 - Curriculum Committee Organizational Chart"
                    className="max-w-full h-auto rounded-lg shadow-lg"
                    style={{ maxHeight: "85vh" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Program Overview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">
                Program Overview
              </h3>
            </div>
            <div className="space-y-3 text-gray-600">
              <p>
                The Special Education Integration Program (SEIP) is designed to
                provide inclusive education opportunities for students with
                special needs within the mainstream educational environment.
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Individualized Education Plans (IEP)</li>
                <li>Specialized Teaching Methods</li>
                <li>Resource Room Support</li>
                <li>Collaborative Learning Approaches</li>
                <li>Assessment Accommodations</li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Mail className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">
                Contact Information
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-3" />
                <span className="text-sm">Program Hotline: +60X-XXX-XXXX</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-3" />
                <span className="text-sm">seip@school.edu.my</span>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  For program inquiries, please contact the SEIP coordination
                  team during office hours: 8:00 AM - 4:00 PM (Monday - Friday)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © 2025 Special Education Integration Program. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SEIPManagement;

import React from "react";
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Award,
  Calendar,
  ChevronDown,
  ChevronRight,
  Search,
  Filter,
  Grid,
  List,
  User,
  BookOpen,
  Briefcase,
  GraduationCap,
  Heart,
  Shield,
  Building,
} from "lucide-react";

import organizational_chart_img from "../../../assets/images/about/org-chart.jpeg";

const OrganizationalChart = () => {
  // Demo data - now empty, as all sections are removed
  const organizationData = {};

  // No members since all sections are removed
  const allMembers = [];

  const [selectedDepartment, setSelectedDepartment] = React.useState("all");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [viewMode, setViewMode] = React.useState("grid");
  const [selectedMember, setSelectedMember] = React.useState(null);
  const [expandedDepartments, setExpandedDepartments] = React.useState(new Set());

  const toggleDepartment = (deptKey) => {
    const newExpanded = new Set(expandedDepartments);
    if (newExpanded.has(deptKey)) {
      newExpanded.delete(deptKey);
    } else {
      newExpanded.add(deptKey);
    }
    setExpandedDepartments(newExpanded);
  };

  const MemberCard = ({ member, isCompact = false }) => (
    <div
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
        isCompact ? "p-4" : "p-6"
      }`}
      onClick={() => setSelectedMember(member)}
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={member.image}
            alt={member.name}
            className={`rounded-full object-cover ${
              isCompact ? "w-12 h-12" : "w-16 h-16"
            }`}
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-bold text-gray-900 truncate ${
              isCompact ? "text-sm" : "text-lg"
            }`}
          >
            {member.name}
          </h3>
          <p
            className={`text-gray-600 truncate ${
              isCompact ? "text-xs" : "text-sm"
            }`}
          >
            {member.position}
          </p>
          <p
            className={`text-gray-500 truncate ${
              isCompact ? "text-xs" : "text-sm"
            }`}
          >
            {member.department}
          </p>
        </div>
      </div>

      {!isCompact && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-600 text-sm">
            <Mail className="w-4 h-4 mr-2" />
            <span className="truncate">{member.email}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Phone className="w-4 h-4 mr-2" />
            <span>{member.phone}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{member.office}</span>
          </div>
        </div>
      )}
    </div>
  );

  const MemberModal = ({ member, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {member.name}
                </h2>
                <p className="text-xl text-gray-600">{member.position}</p>
                <p className="text-lg text-gray-500">{member.department}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-3" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>{member.office}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3" />
                  <span>{member.yearsAtSchool} years at school</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Qualifications
              </h3>
              <ul className="space-y-2">
                {member.qualifications.map((qual, index) => (
                  <li key={index} className="flex items-start">
                    <Award className="w-4 h-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{qual}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
            <p className="text-gray-600 leading-relaxed">{member.bio}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Specialties
            </h3>
            <div className="flex flex-wrap gap-2">
              {member.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-1 w-12 bg-yellow-400 rounded"></div>
            <span className="text-yellow-400 font-medium tracking-wide">
              ABOUT-US
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            School Organizational Chart
          </h1>
          <p className="text-blue-100 text-lg">
            Meet our dedicated team of educators, administrators, and support
            staff committed to student success
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl mt-10 max-w-7xl mx-auto overflow-hidden hover:shadow-2xl transition-all duration-300">
        {/* Chart Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <h3 className="text-2xl font-bold text-center">
            CARTA ORGANISASI SMK SURIA PERDANA, BATU PAHAT
          </h3>
        </div>

        {/* Chart Image */}
        <div className="p-8">
          <div className="relative bg-gray-50 rounded-xl overflow-hidden">
            <img
              src={organizational_chart_img}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section (disabled, since no data) */}
        {/*
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          ...search/filter UI...
        </div>
        */}

        {/* Organizational Chart by Department (none) */}
        {/* No department cards shown */}

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {allMembers.length}
            </div>
            <div className="text-gray-600">Total Staff</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-gray-600">Departments</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">0%</div>
            <div className="text-gray-600">Advanced Degrees</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-gray-600">Avg. Years</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationalChart;

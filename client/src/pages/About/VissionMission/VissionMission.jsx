import React, { useState, useEffect } from "react";
import {
  Eye,
  Target,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  Lightbulb,
  Heart,
  Star,
} from "lucide-react";

import visi_img from "../../../assets/images/about/visi.jpeg";
import roadmap_img from "../../../assets/images/about/roadmap.jpeg";
import matlamat_img from "../../../assets/images/about/matlamat.jpeg";

const VisionMission = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const supportingImages = [
    {
      id: 1,
      src: visi_img,
      title: "Quality Education",
      description:
        "Providing excellent educational opportunities for all students",
      icon: BookOpen,
    },
    {
      id: 2,
      src: roadmap_img,
      title: "Holistic Development",
      description: "Nurturing well-rounded individuals with strong character",
      icon: Users,
    },
    {
      id: 3,
      src: matlamat_img,
      title: "National Progress",
      description: "Contributing to the prosperity and growth of our nation",
      icon: Award,
    },
  ];

  const keyPoints = [
    {
      icon: Lightbulb,
      title: "Innovation in Education",
      description: "Embracing modern teaching methods and technologies",
    },
    {
      icon: Heart,
      title: "Student-Centered Approach",
      description: "Focusing on individual student needs and potential",
    },
    {
      icon: Star,
      title: "Excellence in All Areas",
      description: "Striving for high standards in academics and character",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-1 w-12 bg-yellow-400 rounded"></div>
            <span className="text-yellow-400 font-medium tracking-wide">
              ABOUT-US
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Vision & Mission
          </h1>
          <p className="text-blue-100 text-lg">
            Guiding our educational journey towards excellence and national
            prosperity
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-blue-100">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-4">
                  <Eye className="w-10 h-10 text-white" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                VISI SEKOLAH / SCHOOL VISION
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                  Pendidikan Berkualiti Insan Terdidik Negara Sejahtera
                </h3>
                <div className="flex justify-center my-6">
                  <ArrowRight className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-blue-700 text-center">
                  Quality Education, Holistic Individuals, A Prosperous Nation
                </h3>
              </div>

              {/* Vision breakdown */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-blue-800 mb-2">
                    Quality Education
                  </h4>
                  <p className="text-gray-600">
                    Providing excellent educational standards and opportunities
                  </p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-200">
                  <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-purple-800 mb-2">
                    Holistic Individuals
                  </h4>
                  <p className="text-gray-600">
                    Developing well-rounded, educated personalities
                  </p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                  <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-green-800 mb-2">
                    Prosperous Nation
                  </h4>
                  <p className="text-gray-600">
                    Contributing to national development and success
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`transform transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-green-100">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-4">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  MISI SEKOLAH / SCHOOL MISSION
                </h2>
              </div>

              <div className="max-w-5xl mx-auto space-y-8">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
                  <p className="text-xl md:text-2xl text-gray-800 mb-6 text-center leading-relaxed">
                    Melestarikan Sistem Pendidikan Yang Berkualiti Untuk
                    Membangunkan Potensi Individu Bagi Memenuhi Aspirasi Negara
                  </p>
                  <div className="flex justify-center my-6">
                    <ArrowRight className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-xl md:text-2xl text-green-700 font-semibold text-center leading-relaxed">
                    To sustain a quality education system that nurtures
                    individual potential in line with the nation's aspirations.
                  </p>
                </div>

                {/* Mission key points */}
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                  {keyPoints.map((point, index) => {
                    const IconComponent = point.icon;
                    return (
                      <div
                        key={index}
                        className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                      >
                        <IconComponent className="w-12 h-12 text-green-600 mx-auto mb-4" />
                        <h4 className="text-xl font-bold text-gray-800 mb-3">
                          {point.title}
                        </h4>
                        <p className="text-gray-600">{point.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supporting Images Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className={`transform transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Commitment in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our vision and mission come to life through our
              educational programs and initiatives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportingImages.map((image, index) => {
              const IconComponent = image.icon;
              return (
                <div
                  key={image.id}
                  className={`group transform transition-all duration-500 delay-${
                    index * 200
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>      
    </div>
  );
};

export default VisionMission;

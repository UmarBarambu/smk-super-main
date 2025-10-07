import React, { useState } from "react";
import {
  Eye,
  Target,
  Award,
  Lightbulb,
  Heart,
  Users,
  CheckCircle,
  Star,
} from "lucide-react";

const SchoolIdentityPage = () => {
  const [activeTab, setActiveTab] = useState("vision");

  const tabs = [
    { id: "vision", label: "Vision & Mission", icon: Eye },
    { id: "objectives", label: "Objectives", icon: Target },
    { id: "philosophy", label: "Philosophy", icon: Lightbulb },
    { id: "values", label: "Core Values", icon: Heart },
  ];

  const coreValues = [
    { title: "Integriti", english: "Integrity", icon: Award },
    { title: "Menepati Masa", english: "Punctuality", icon: CheckCircle },
    { title: "Prestasi Tinggi", english: "Excellence", icon: Star },
    {
      title: "Budaya Penyayang",
      english: "Compassionate Culture",
      icon: Heart,
    },
    { title: "Kerja Sepasukan", english: "Teamwork", icon: Users },
  ];

  const objectives = [
    {
      bm: "Melaksanakan Dasar Pendidikan Negara",
      en: "To implement the National Education Policy",
    },
    {
      bm: "Melaksanakan Dasar PPPM 2013-2025",
      en: "Malaysia Education Blueprint (PPPM) 2013-2025",
    },
    {
      bm: "Menjadikan pelajar cergas, berdisiplin, berilmu tinggi dan bersikap positif terhadap segala usaha pendidikan",
      en: "To cultivate active, disciplined, and highly knowledgeable students with a positive attitude toward all educational endeavors",
    },
    {
      bm: "Mempertingkat serta memupuk minat, kesedaran dan kecekapan/kemahiran belajar yang tinggi dan berkekalan dalam kalangan pelajar",
      en: "To enhance and nurture sustained interest, awareness, and high competency/learning skills among students",
    },
    {
      bm: "Menghapuskan sikap negatif yang menghalang kemajuan pembelajaran dan mewujudkan nilai dan semangat berjuang yang tinggi terhadap kecemerlangan kurikulum dan kokurikulum",
      en: "To eradicate negative attitudes hindering academic progress and instill strong values and resilience in pursuing excellence in both curricular and co-curricular activities",
    },
    {
      bm: "Mewujudkan golongan pelajar yang peka terhadap perubahan positif",
      en: "To develop students who are responsive to positive change",
    },
    {
      bm: "Membina dan memelihara sebuah masyarakat yang harmonis, bersepadu dan taat setia sepertimana yang termaktub dalam Prinsip Rukun Negara",
      en: "To build and preserve a harmonious, united, and loyal society in line with the Rukun Negara (National Principles)",
    },
    {
      bm: "Meningkatkan pencapaian kognitif, afektif dan psikomotor para pelajar supaya mereka menjadi insan yang berpelajaran dan berpendidikan",
      en: "To elevate students' cognitive, affective, and psychomotor development, shaping them into well-rounded and educated individuals",
    },
  ];

  const renderVisionMission = () => (
    <div className="space-y-8">
      {/* Vision */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-blue-900">
            VISI SEKOLAH / SCHOOL VISION
          </h3>
        </div>
        <div className="space-y-3">
          <p className="text-lg text-gray-700 font-medium">
            Pendidikan Berkualiti Insan Terdidik Negara Sejahtera
          </p>
          <p className="text-lg text-blue-800 font-semibold">
            Quality Education, Holistic Individuals, A Prosperous Nation
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-500 p-2 rounded-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-green-900">
            MISI SEKOLAH / SCHOOL MISSION
          </h3>
        </div>
        <div className="space-y-3">
          <p className="text-lg text-gray-700">
            Melestarikan Sistem Pendidikan Yang Berkualiti Untuk Membangunkan
            Potensi Individu Bagi Memenuhi Aspirasi Negara
          </p>
          <p className="text-lg text-green-800 font-semibold">
            To sustain a quality education system that nurtures individual
            potential in line with the nation's aspirations.
          </p>
        </div>
      </div>

      {/* Motto */}
      <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl p-6 border border-purple-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-purple-500 p-2 rounded-lg">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-purple-900">
            MOTTO SEKOLAH / SCHOOL MOTTO
          </h3>
        </div>
        <div className="space-y-3">
          <p className="text-xl text-gray-700 font-bold">
            Bersatu Berusaha Berjaya
          </p>
          <p className="text-xl text-purple-800 font-bold">
            Unity Effort Success
          </p>
        </div>
      </div>

      {/* Slogan */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-xl p-6 border border-orange-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-orange-500 p-2 rounded-lg">
            <Star className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-orange-900">
            SLOGAN SEKOLAH / SCHOOL SLOGAN
          </h3>
        </div>
        <p className="text-2xl text-orange-800 font-bold text-center">
          TOGETHER TOWARDS EXCELLENCE
        </p>
      </div>

      {/* Goals */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-100 rounded-xl p-6 border border-teal-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-teal-500 p-2 rounded-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-teal-900">
            MATLAMAT SEKOLAH / SCHOOL GOAL
          </h3>
        </div>
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            Melahirkan pelajar-pelajar yang berilmu berpendidikan dan
            berdisiplin agar dapat memberikan sumbangan yang positif kepada
            masyarakat, agama, bangsa dan Negara. Merealisasikan PPPM 2013-2025
          </p>
          <p className="text-lg text-teal-800 font-semibold">
            To nurture knowledgeable, well-educated, and disciplined students
            who contribute meaningfully to society, faith, nation, and the
            country, in line with the Malaysia Education Blueprint (PPPM)
            2013-2025.
          </p>
        </div>
      </div>
    </div>
  );

  const renderObjectives = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">
          OBJEKTIF SEKOLAH / SCHOOL OBJECTIVES
        </h3>
        <p className="text-gray-600">
          Our comprehensive objectives for student development
        </p>
      </div>

      <div className="grid gap-6 md:gap-8">
        {objectives.map((objective, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-gray-700 leading-relaxed">{objective.bm}</p>
                <p className="text-blue-800 font-semibold leading-relaxed">
                  {objective.en}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPhilosophy = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">
          FALSAFAH SEKOLAH / SCHOOL PHILOSOPHY
        </h3>
        <p className="text-gray-600">
          Our fundamental beliefs and educational approach
        </p>
      </div>

      <div className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-xl p-8 border border-indigo-200">
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-gray-800">
              Bahasa Malaysia
            </h4>
            <p className="text-lg text-gray-700 leading-relaxed">
              Sekolah Menengah Kebangsaan Suria Perdana mampu dan berupaya
              menyediakan kemudahan fizikal, suasana dan masa kerja yang optimum
              ke atas perkembangan intelek bagi melahirkan insan yang
              bermatlamat, bertanggungjawab dan mampu memberi sumbangan yang
              positif kepada bangsa, agama dan Negara. Para pendidik di sekolah
              ini berupaya memberikan pendidikan yang sempurna, menyeluruh,
              bermutu dan seimbang. Setiap pelajar di sekolah ini sewajarnya
              diberi peluang seluas-luasnya dalam mengembangkan kebolehan, bakat
              dan potensi intelek mereka.
            </p>
          </div>

          <div className="border-t border-indigo-200 pt-6">
            <h4 className="text-xl font-semibold text-indigo-800 mb-4">
              English
            </h4>
            <p className="text-lg text-indigo-700 leading-relaxed">
              Sekolah Menengah Kebangsaan Suria Perdana is committed to
              providing optimal physical facilities, a conducive environment,
              and structured working hours to foster intellectual growth,
              nurturing goal-oriented, responsible individuals who contribute
              meaningfully to the nation, faith, and country. Our educators are
              dedicated to delivering holistic, high-quality, and balanced
              education that meets the highest standards. Every student is
              empowered with ample opportunities to explore and develop their
              unique abilities, talents, and intellectual potential to the
              fullest.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderValues = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">
          NILAI / CORE VALUES
        </h3>
        <p className="text-gray-600">
          The fundamental values that guide our school community
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coreValues.map((value, index) => {
          const IconComponent = value.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:scale-105 group"
            >
              <div className="text-center space-y-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-lg text-blue-600 font-semibold">
                    {value.english}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "vision":
        return renderVisionMission();
      case "objectives":
        return renderObjectives();
      case "philosophy":
        return renderPhilosophy();
      case "values":
        return renderValues();
      default:
        return renderVisionMission();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
            School Identity
          </h1>
          <p className="text-blue-100 text-lg">
            Discover our vision, mission, and core values that shape our
            educational excellence
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-fadeIn">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default SchoolIdentityPage;

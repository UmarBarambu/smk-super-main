import React from "react";
import { BookOpen, Users, Lightbulb, Target, Award, Globe } from "lucide-react";

const NationalEducationPhilosophy = () => {
  const philosophyData = {
    title: "National Education Philosophy",
    subtitle: "Shaping Tomorrow's Leaders Through Excellence in Education",
    mainPhilosophy: {
      text: "Education in Malaysia is a continuous effort towards further developing the potential of individuals comprehensively and integratively to create balanced and harmonious individuals intellectually, spiritually, emotionally, and physically based on belief and obedience to God. This effort aims to produce knowledgeable, skilled, virtuous, responsible Malaysians who are capable of achieving personal well-being and contributing to the harmony and prosperity of society and the nation.",
      vision: "Quality Education Well-Groomed Individuals A Prosperous Nation",
      mission:
        "To develop a world-class quality education system that unlocks the full potential of individuals and fulfills the aspirations of Malaysia.",
      goals: [
        "To cultivate a united and loyal Malaysian nation.",
        "To nurture individuals who are faithful, morally upright, knowledgeable, competent, and well-balanced.",
        "To develop human capital for the nation’s advancement.",
        "To provide educational opportunities for all Malaysian citizens.",
      ],
      publicServiceCore: [
        "Committed to Enhancing Service Excellence",
        "Performing Duties with Full Accountability",
        "Striving to Eliminate Self-Centered Attitudes",
        "Delivering Service with Goodwill and Compassion",
        "Working to Advance Public Mindset and National Progress",
        "Collaborating to Eradicate National Vulnerabilities and Threats",
        "Upholding religious principles with convictions",
      ],
    },
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
            National Education Philosophy
          </h1>
          <p className="text-blue-100 text-lg">
            Shaping Tomorrow's Leaders Through Excellence in Education
          </p>
        </div>
      </div>

      {/* Main Philosophy Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              National Education Philosophy
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-5xl mx-auto">
              {philosophyData.mainPhilosophy.text}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {philosophyData.mainPhilosophy.vision}
              </p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-6">
              <h3 className="text-2xl font-semibold text-indigo-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {philosophyData.mainPhilosophy.mission}
              </p>
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Goals
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The objectives that guide our educational philosophy and national
              aspirations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {philosophyData.mainPhilosophy.goals.map((goal, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
              >
                <p className="text-gray-700 leading-relaxed">{goal}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core of Public Service Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core of Public Service
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The fundamental principles that guide public service in Malaysia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {philosophyData.mainPhilosophy.publicServiceCore.map(
              (core, index) => (
                <div
                  key={index}
                  className="border-l-4 border-blue-500 pl-6 py-4"
                >
                  <p className="text-gray-700 leading-relaxed">{core}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NationalEducationPhilosophy;

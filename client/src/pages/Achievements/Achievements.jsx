import React, { useState } from "react";
import { Trophy, Medal, Star, Award, Users, BookOpen, Zap, Target, Calendar, MapPin } from "lucide-react";

const SchoolAchievements = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const achievements = [
    {
      id: 1,
      title: "National Mathematics Olympiad",
      category: "academic",
      year: "2024",
      description: "First place in the National Mathematics Competition with outstanding performance by our Grade 10 students.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop&crop=center",
      icon: <Trophy className="w-6 h-6" />,
      level: "National",
      subject: "Mathematics",
      participants: "15 Students"
    },
    {
      id: 2,
      title: "Regional Science Fair Winner",
      category: "science",
      year: "2024",
      description: "Our robotics team secured first position in the Regional Science and Technology Fair.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop&crop=center",
      icon: <Zap className="w-6 h-6" />,
      level: "Regional",
      subject: "Science & Technology",
      participants: "8 Students"
    },
    {
      id: 3,
      title: "Inter-School Basketball Championship",
      category: "sports",
      year: "2024",
      description: "Champions of the District Basketball Tournament, showcasing exceptional teamwork and sportsmanship.",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop&crop=center",
      icon: <Medal className="w-6 h-6" />,
      level: "District",
      subject: "Sports",
      participants: "12 Players"
    },
    {
      id: 4,
      title: "Outstanding Academic Excellence",
      category: "academic",
      year: "2023",
      description: "Achieved 98% pass rate in national examinations, ranking among top 5 schools in the state.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=250&fit=crop&crop=center",
      icon: <BookOpen className="w-6 h-6" />,
      level: "State",
      subject: "Overall Performance",
      participants: "450 Students"
    },
    {
      id: 5,
      title: "Environmental Conservation Award",
      category: "community",
      year: "2024",
      description: "Recognized for innovative green initiatives and sustainable practices in school operations.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop&crop=center",
      icon: <Star className="w-6 h-6" />,
      level: "Regional",
      subject: "Environmental Science",
      participants: "200 Students"
    },
    {
      id: 6,
      title: "Debate Championship",
      category: "academic",
      year: "2024",
      description: "Winners of the State-level English Debate Competition, demonstrating exceptional oratory skills.",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=250&fit=crop&crop=center",
      icon: <Award className="w-6 h-6" />,
      level: "State",
      subject: "English Language",
      participants: "6 Students"
    }
  ];

  const categories = [
    { id: "all", name: "All Achievements", icon: <Target className="w-4 h-4" /> },
    { id: "academic", name: "Academic", icon: <BookOpen className="w-4 h-4" /> },
    { id: "sports", name: "Sports", icon: <Medal className="w-4 h-4" /> },
    { id: "science", name: "Science", icon: <Zap className="w-4 h-4" /> },
    { id: "community", name: "Community", icon: <Users className="w-4 h-4" /> }
  ];

  const filteredAchievements = activeCategory === "all" 
    ? achievements 
    : achievements.filter(achievement => achievement.category === activeCategory);

  const getLevelColor = (level) => {
    switch (level) {
      case "National": return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case "State": return "bg-gradient-to-r from-blue-500 to-blue-700";
      case "Regional": return "bg-gradient-to-r from-green-500 to-green-700";
      case "District": return "bg-gradient-to-r from-purple-500 to-purple-700";
      default: return "bg-gradient-to-r from-gray-500 to-gray-700";
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6 shadow-lg">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Our Achievements
          </h2>
          <p className="text-lg text-blue-600 max-w-3xl mx-auto">
            Celebrating excellence in academics, sports, and community service. 
            Our students consistently demonstrate outstanding performance and bring pride to our institution.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105"
                  : "bg-white text-blue-700 border-2 border-blue-200 hover:border-blue-400 hover:shadow-md"
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAchievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-blue-100 hover:border-blue-300 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Achievement Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Level Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold ${getLevelColor(achievement.level)}`}>
                  {achievement.level}
                </div>
                
                {/* Year Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-blue-900 text-sm font-semibold flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {achievement.year}
                </div>

                {/* Icon */}
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                  {achievement.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3 line-clamp-2">
                  {achievement.title}
                </h3>
                
                <p className="text-blue-600 text-sm mb-4 line-clamp-3">
                  {achievement.description}
                </p>

                {/* Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-medium">Subject:</span>
                    <span>{achievement.subject}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">Participants:</span>
                    <span>{achievement.participants}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-blue-100 mt-4">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Awards Won</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">15</div>
              <div className="text-blue-100">National Recognitions</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">2024</div>
              <div className="text-blue-100">School of the Year</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolAchievements;
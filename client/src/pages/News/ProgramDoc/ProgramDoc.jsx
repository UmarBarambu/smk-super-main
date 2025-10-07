import React from 'react';
import { BookOpen, Clock, Users, Award, Download, FileText, Video, ExternalLink, Search, Filter, ChevronDown, ChevronRight, GraduationCap, Target, CheckCircle } from 'lucide-react';

const ProgramDocumentation = () => {
  // Demo data - easily replaceable with API/database calls
  const programs = [
    {
      id: 1,
      title: "Advanced Placement (AP) Program",
      category: "Academic Excellence",
      level: "High School",
      duration: "1-4 Years",
      participants: "850+ Students",
      description: "Rigorous college-level courses and examinations that allow high school students to earn college credit and demonstrate mastery of college-level work.",
      objectives: [
        "Prepare students for college-level coursework",
        "Develop critical thinking and analytical skills",
        "Provide opportunity to earn college credit"
      ],
      subjects: ["Mathematics", "Sciences", "Literature", "History", "Languages", "Arts"],
      requirements: [
        "Minimum GPA of 3.0",
        "Teacher recommendation",
        "Completion of prerequisite courses"
      ],
      outcomes: [
        "92% pass rate on AP examinations",
        "Average college credit earned: 12 hours",
        "98% college acceptance rate"
      ],
      documents: [
        { name: "AP Program Handbook", type: "PDF", size: "2.4 MB", url: "#" },
        { name: "Course Catalog", type: "PDF", size: "1.8 MB", url: "#" },
        { name: "Registration Guide", type: "PDF", size: "956 KB", url: "#" }
      ],
      media: [
        { name: "Program Overview Video", type: "Video", duration: "8:30", url: "#" },
        { name: "Student Testimonials", type: "Video", duration: "5:15", url: "#" }
      ],
      featured: true,
      lastUpdated: "2024-05-20"
    },
    {
      id: 2,
      title: "STEM Innovation Laboratory",
      category: "Science & Technology",
      level: "Middle & High School",
      duration: "Ongoing",
      participants: "650+ Students",
      description: "Hands-on learning environment where students engage in science, technology, engineering, and mathematics through project-based learning and real-world applications.",
      objectives: [
        "Foster innovation and creativity in STEM fields",
        "Develop problem-solving and collaboration skills",
        "Prepare students for STEM careers"
      ],
      subjects: ["Robotics", "Computer Science", "Engineering Design", "Data Science", "Biotechnology"],
      requirements: [
        "Interest in STEM fields",
        "Basic mathematics proficiency",
        "Commitment to project completion"
      ],
      outcomes: [
        "45 patents filed by student teams",
        "National science fair winners: 15 students",
        "85% pursue STEM in college"
      ],
      documents: [
        { name: "STEM Lab Manual", type: "PDF", size: "3.2 MB", url: "#" },
        { name: "Project Guidelines", type: "PDF", size: "1.5 MB", url: "#" },
        { name: "Safety Protocols", type: "PDF", size: "800 KB", url: "#" }
      ],
      media: [
        { name: "Lab Tour Virtual Reality", type: "Interactive", duration: "12:00", url: "#" },
        { name: "Student Projects Showcase", type: "Video", duration: "15:45", url: "#" }
      ],
      featured: true,
      lastUpdated: "2024-05-18"
    },
    {
      id: 3,
      title: "International Baccalaureate (IB) Program",
      category: "Global Education",
      level: "High School",
      duration: "2 Years",
      participants: "320+ Students",
      description: "Internationally recognized diploma program that develops intellectually, personally, emotionally and socially responsible global citizens.",
      objectives: [
        "Develop international mindedness",
        "Promote academic rigor and breadth",
        "Encourage service learning and community engagement"
      ],
      subjects: ["Theory of Knowledge", "Extended Essay", "Creativity, Activity, Service", "Six Subject Groups"],
      requirements: [
        "Minimum GPA of 3.5",
        "Language proficiency assessment",
        "Personal statement and interview"
      ],
      outcomes: [
        "98% diploma completion rate",
        "Average score: 36/45 points",
        "100% university acceptance rate"
      ],
      documents: [
        { name: "IB Programme Guide", type: "PDF", size: "4.1 MB", url: "#" },
        { name: "Assessment Criteria", type: "PDF", size: "2.3 MB", url: "#" },
        { name: "CAS Handbook", type: "PDF", size: "1.2 MB", url: "#" }
      ],
      media: [
        { name: "IB Philosophy Explained", type: "Video", duration: "10:20", url: "#" },
        { name: "Global Campus Virtual Tour", type: "Interactive", duration: "18:30", url: "#" }
      ],
      featured: false,
      lastUpdated: "2024-05-15"
    },
    {
      id: 4,
      title: "Arts Integration Program",
      category: "Creative Arts",
      level: "K-12",
      duration: "Year-round",
      participants: "1200+ Students",
      description: "Comprehensive arts education program integrating visual arts, music, theater, and digital media across all academic subjects.",
      objectives: [
        "Enhance creativity and self-expression",
        "Integrate arts with core academic subjects",
        "Develop cultural awareness and appreciation"
      ],
      subjects: ["Visual Arts", "Music", "Theater", "Digital Media", "Dance", "Creative Writing"],
      requirements: [
        "Enrollment in core arts classes",
        "Portfolio development",
        "Performance participation"
      ],
      outcomes: [
        "150+ public performances annually",
        "Regional arts competition winners",
        "95% student satisfaction rate"
      ],
      documents: [
        { name: "Arts Curriculum Overview", type: "PDF", size: "2.8 MB", url: "#" },
        { name: "Performance Calendar", type: "PDF", size: "1.1 MB", url: "#" },
        { name: "Portfolio Guidelines", type: "PDF", size: "1.4 MB", url: "#" }
      ],
      media: [
        { name: "Student Art Gallery", type: "Interactive", duration: "N/A", url: "#" },
        { name: "Concert Highlights", type: "Video", duration: "25:10", url: "#" }
      ],
      featured: false,
      lastUpdated: "2024-05-12"
    }
  ];

  const categories = ["All Programs", "Academic Excellence", "Science & Technology", "Global Education", "Creative Arts"];
  const levels = ["All Levels", "Elementary", "Middle School", "High School", "K-12"];

  const [selectedCategory, setSelectedCategory] = React.useState("All Programs");
  const [selectedLevel, setSelectedLevel] = React.useState("All Levels");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [expandedProgram, setExpandedProgram] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState({});

  const filteredPrograms = programs.filter(program => {
    const matchesCategory = selectedCategory === "All Programs" || program.category === selectedCategory;
    const matchesLevel = selectedLevel === "All Levels" || program.level.includes(selectedLevel) || program.level === selectedLevel;
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const featuredPrograms = programs.filter(program => program.featured);

  const toggleProgram = (programId) => {
    setExpandedProgram(expandedProgram === programId ? null : programId);
    setActiveTab(prev => ({ ...prev, [programId]: 'overview' }));
  };

  const setTab = (programId, tab) => {
    setActiveTab(prev => ({ ...prev, [programId]: tab }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <BookOpen className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Program Documentation</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive information about our academic programs, requirements, outcomes, and resources
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Programs Banner */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Programs</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPrograms.map((program) => (
              <div key={program.id} className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <GraduationCap className="w-6 h-6 mr-3" />
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                      {program.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{program.title}</h3>
                  <p className="text-indigo-100 mb-6 leading-relaxed">{program.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{program.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">{program.participants}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleProgram(program.id)}
                    className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Level Filter */}
            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Programs List */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              All Programs ({filteredPrograms.length})
            </h2>
            <div className="text-gray-500 text-sm">
              Last updated: May 2024
            </div>
          </div>

          <div className="space-y-6">
            {filteredPrograms.map((program) => (
              <div key={program.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Program Header */}
                <div className="p-8 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                          {program.category}
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {program.level}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{program.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{program.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-5 h-5 mr-2 text-indigo-500" />
                          <span>Duration: {program.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="w-5 h-5 mr-2 text-indigo-500" />
                          <span>{program.participants}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Award className="w-5 h-5 mr-2 text-indigo-500" />
                          <span>Updated: {program.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleProgram(program.id)}
                      className="ml-6 flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                    >
                      {expandedProgram === program.id ? (
                        <>
                          <ChevronDown className="w-5 h-5 mr-2" />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <ChevronRight className="w-5 h-5 mr-2" />
                          View Details
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Program Details */}
                {expandedProgram === program.id && (
                  <div className="p-8">
                    {/* Tab Navigation */}
                    <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
                      {['overview', 'requirements', 'outcomes', 'resources'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setTab(program.id, tab)}
                          className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                            activeTab[program.id] === tab || (!activeTab[program.id] && tab === 'overview')
                              ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                              : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                          }`}
                        >
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Overview Tab */}
                      {(activeTab[program.id] === 'overview' || !activeTab[program.id]) && (
                        <>
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                              <Target className="w-5 h-5 mr-2 text-indigo-500" />
                              Program Objectives
                            </h4>
                            <ul className="space-y-3">
                              {program.objectives.map((objective, index) => (
                                <li key={index} className="flex items-start">
                                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">{objective}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                              <BookOpen className="w-5 h-5 mr-2 text-indigo-500" />
                              Subject Areas
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {program.subjects.map((subject, index) => (
                                <span key={index} className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm font-medium">
                                  {subject}
                                </span>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {/* Requirements Tab */}
                      {activeTab[program.id] === 'requirements' && (
                        <div className="lg:col-span-2">
                          <h4 className="text-xl font-bold text-gray-900 mb-4">Program Requirements</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ul className="space-y-3">
                              {program.requirements.map((requirement, index) => (
                                <li key={index} className="flex items-start">
                                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                    <span className="text-indigo-600 font-bold text-sm">{index + 1}</span>
                                  </div>
                                  <span className="text-gray-700">{requirement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Outcomes Tab */}
                      {activeTab[program.id] === 'outcomes' && (
                        <div className="lg:col-span-2">
                          <h4 className="text-xl font-bold text-gray-900 mb-4">Program Outcomes</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {program.outcomes.map((outcome, index) => (
                              <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                                <div className="text-2xl font-bold text-green-600 mb-2">
                                  {outcome.split(' ')[0]}
                                </div>
                                <p className="text-gray-700 text-sm">{outcome.split(' ').slice(1).join(' ')}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Resources Tab */}
                      {activeTab[program.id] === 'resources' && (
                        <>
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                              <FileText className="w-5 h-5 mr-2 text-indigo-500" />
                              Documents & Guides
                            </h4>
                            <div className="space-y-3">
                              {program.documents.map((doc, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                  <div className="flex items-center">
                                    <Download className="w-5 h-5 text-gray-400 mr-3" />
                                    <div>
                                      <p className="font-medium text-gray-900">{doc.name}</p>
                                      <p className="text-sm text-gray-500">{doc.type} • {doc.size}</p>
                                    </div>
                                  </div>
                                  <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                                    Download
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                              <Video className="w-5 h-5 mr-2 text-indigo-500" />
                              Multimedia Resources
                            </h4>
                            <div className="space-y-3">
                              {program.media.map((media, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                  <div className="flex items-center">
                                    <Video className="w-5 h-5 text-gray-400 mr-3" />
                                    <div>
                                      <p className="font-medium text-gray-900">{media.name}</p>
                                      <p className="text-sm text-gray-500">{media.type} • {media.duration}</p>
                                    </div>
                                  </div>
                                  <button className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                                    View <ExternalLink className="w-4 h-4 ml-1" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProgramDocumentation;
import React from "react";
import {
  Calendar,
  Users,
  Trophy,
  BookOpen,
  Star,
  ArrowRight,
} from "lucide-react";
import curi_registra_img from "../../../assets/images/Co-Curriculum Registration activity 1.jpg";

const SchoolHighlights = () => {
  // Demo data - easily replaceable with API/database calls
  const highlights = [
    {
      id: 1,
      title: "National Science Fair Champions",
      category: "Achievement",
      date: "2024-05-15",
      image: curi_registra_img,
      excerpt:
        "Our talented students secured first place in the National Science Fair with their innovative renewable energy project.",
      featured: true,
      tags: ["Science", "Competition", "STEM"],
    },
    {
      id: 2,
      title: "New Digital Learning Lab Opens",
      category: "Facilities",
      date: "2024-05-10",
      image: curi_registra_img,
      excerpt:
        "State-of-the-art technology center equipped with latest computers, VR headsets, and interactive whiteboards.",
      featured: false,
      tags: ["Technology", "Innovation", "Learning"],
    },
    {
      id: 3,
      title: "Student Orchestra Performs at City Hall",
      category: "Arts",
      date: "2024-05-08",
      image: curi_registra_img,
      excerpt:
        "Our school orchestra delivered a stunning performance at the Mayor's Cultural Arts Festival.",
      featured: true,
      tags: ["Music", "Performance", "Arts"],
    },
    {
      id: 4,
      title: "Sustainability Initiative Launched",
      category: "Environment",
      date: "2024-05-05",
      image: curi_registra_img,
      excerpt:
        "New campus-wide recycling program and solar panel installation reduce our environmental footprint.",
      featured: false,
      tags: ["Environment", "Sustainability", "Community"],
    },
    {
      id: 5,
      title: "Athletic Department Wins Regional Title",
      category: "Sports",
      date: "2024-05-01",
      image: curi_registra_img,
      excerpt:
        "Multiple teams showcase excellence in regional championships across various sports disciplines.",
      featured: false,
      tags: ["Sports", "Athletics", "Championship"],
    },
    {
      id: 6,
      title: "Community Service Recognition",
      category: "Community",
      date: "2024-04-28",
      image: curi_registra_img,
      excerpt:
        "Students volunteer 500+ hours in local community projects, earning citywide recognition.",
      featured: false,
      tags: ["Community", "Service", "Volunteer"],
    },
  ];

  const categories = [
    "All",
    "Achievement",
    "Facilities",
    "Arts",
    "Environment",
    "Sports",
    "Community",
  ];

  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [filteredHighlights, setFilteredHighlights] =
    React.useState(highlights);

  React.useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredHighlights(highlights);
    } else {
      setFilteredHighlights(
        highlights.filter((item) => item.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Achievement: Trophy,
      Facilities: BookOpen,
      Arts: Star,
      Environment: Users,
      Sports: Trophy,
      Community: Users,
    };
    return icons[category] || BookOpen;
  };

  const featuredHighlights = highlights.filter((item) => item.featured);
  const regularHighlights = filteredHighlights.filter((item) => !item.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-1 w-12 bg-yellow-400 rounded"></div>
            <span className="text-yellow-400 font-medium tracking-wide">
              NEWS
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            School Highlights{" "}
          </h1>
          <p className="text-blue-100 text-lg">
            Celebrating our achievements, milestones, and the exceptional
            moments that make our school community shine
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Highlights */}
        {featuredHighlights.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Featured Highlights
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredHighlights.map((highlight) => {
                const IconComponent = getCategoryIcon(highlight.category);
                return (
                  <div
                    key={highlight.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={highlight.image}
                        alt={highlight.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {highlight.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(highlight.date)}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {highlight.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {highlight.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {highlight.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Regular Highlights Grid */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {selectedCategory === "All"
              ? "All Highlights"
              : `${selectedCategory} Highlights`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularHighlights.map((highlight) => {
              const IconComponent = getCategoryIcon(highlight.category);
              return (
                <div
                  key={highlight.id}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={highlight.image}
                      alt={highlight.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-2">
                        <IconComponent className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        {highlight.category}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(highlight.date)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                      {highlight.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {highlight.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {highlight.tags.length > 2 && (
                        <span className="text-gray-400 text-xs px-2 py-1">
                          +{highlight.tags.length - 2} more
                        </span>
                      )}
                    </div>
                    <button className="flex items-center text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors group">
                      Learn More
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SchoolHighlights;

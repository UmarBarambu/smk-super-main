import { useState } from "react";
import { Bell, ChevronRight, Calendar, Users, Info } from "lucide-react";

// Categories with their corresponding icons
const categories = {
  Events: <Calendar size={16} />,
  Academic: <Info size={16} />,
  Sports: <Users size={16} />,
  General: <Bell size={16} />,
};

export default function AnnouncementSection({ data }) {
  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
      </div>
    );

  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  // Filter categories including "All"
  const filters = ["All", "Important", ...Object.keys(categories)];

  // Filter announcements based on selected filter
  const filteredAnnouncements = data.announcements.filter((announcement) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Important") return announcement.type === "Important";
    return announcement.type === activeFilter;
  });

  // Format date in a more readable way
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Toggle announcement expansion
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-blue-800">{data.title}</h2>
        <div className="hidden md:block">
          <div className="flex space-x-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile filter dropdown */}
      <div className="mb-4 md:hidden">
        <select
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md bg-white"
        >
          {filters.map((filter) => (
            <option key={filter} value={filter}>
              {filter}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className={`border-b border-gray-200 last:border-b-0 ${
                announcement.important ? "bg-amber-50" : ""
              }`}
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleExpand(announcement.id)}
              >
                <div className="flex items-start space-x-3">
                  {announcement.important && (
                    <span className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-red-500"></span>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {announcement.title}
                    </h3>
                    <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-600 mt-1 space-y-1 md:space-y-0 md:space-x-4">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(announcement.date)}
                      </span>
                      <span className="flex items-center">
                        {categories[announcement.category]}
                        <span className="ml-1">{announcement.type}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight
                  size={20}
                  className={`text-gray-400 transition-transform duration-200 ${
                    expandedId === announcement.id ? "transform rotate-90" : ""
                  }`}
                />
              </div>

              {expandedId === announcement.id && (
                <div className="px-4 pb-4 pt-0 text-gray-700">
                  <p>{announcement.details}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            No announcements found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}

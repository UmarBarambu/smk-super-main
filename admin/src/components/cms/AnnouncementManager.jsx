import { useState } from "react";
import FormField from "./FormField";
import { Upload } from "lucide-react";


// Announcements Manager Component
export default function AnnouncementManager() {
    const [announcements, setAnnouncements] = useState([
      { 
        id: 1, 
        title: "Annual School Festival", 
        date: "2025-06-15", 
        content: "Join us for our annual school festival featuring performances, games, and food stalls.",
        featured: true
      },
      { 
        id: 2, 
        title: "Parent-Teacher Meeting", 
        date: "2025-05-25", 
        content: "The quarterly parent-teacher meeting will be held next Friday. Please register online.",
        featured: false
      }
    ]);
    
    const [isEditing, setIsEditing] = useState(false);
    const [currentAnnouncement, setCurrentAnnouncement] = useState({
      id: null,
      title: "",
      date: "",
      content: "",
      featured: false
    });
  
    const addNewAnnouncement = () => {
      setIsEditing(true);
      setCurrentAnnouncement({
        id: Date.now(),
        title: "",
        date: new Date().toISOString().split('T')[0],
        content: "",
        featured: false
      });
    };
  
    const editAnnouncement = (announcement) => {
      setIsEditing(true);
      setCurrentAnnouncement(announcement);
    };
  
    const deleteAnnouncement = (id) => {
      if (window.confirm("Are you sure you want to delete this announcement?")) {
        setAnnouncements(announcements.filter(item => item.id !== id));
      }
    };
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setCurrentAnnouncement(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (announcements.find(item => item.id === currentAnnouncement.id)) {
        // Update existing announcement
        setAnnouncements(announcements.map(item => 
          item.id === currentAnnouncement.id ? currentAnnouncement : item
        ));
      } else {
        // Add new announcement
        setAnnouncements([...announcements, currentAnnouncement]);
      }
      
      setIsEditing(false);
      setCurrentAnnouncement({
        id: null,
        title: "",
        date: "",
        content: "",
        featured: false
      });
    };
  
    return (
      <div className="space-y-6">
        {isEditing ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">
              {currentAnnouncement.id ? "Edit Announcement" : "Add New Announcement"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <FormField
                  label="Title"
                  name="title"
                  value={currentAnnouncement.title}
                  onChange={handleChange}
                  placeholder="Announcement title"
                  required
                />
                
                <FormField
                  label="Date"
                  name="date"
                  type="date"
                  value={currentAnnouncement.date}
                  onChange={handleChange}
                  required
                />
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <textarea
                    name="content"
                    value={currentAnnouncement.content}
                    onChange={handleChange}
                    rows="4"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Announcement details"
                    required
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    checked={currentAnnouncement.featured}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                    Feature this announcement (shows prominently on the homepage)
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
                  >
                    {currentAnnouncement.id ? "Update" : "Add"} Announcement
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Event Announcements ({announcements.length})</h3>
              <button
                onClick={addNewAnnouncement}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
              >
                Add Announcement
              </button>
            </div>
            
            <div className="space-y-4">
              {announcements.map(announcement => (
                <div key={announcement.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                        {announcement.featured && (
                          <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(announcement.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-x-3">
                      <button 
                        onClick={() => editAnnouncement(announcement)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteAnnouncement(announcement.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-gray-700">
                    {announcement.content}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
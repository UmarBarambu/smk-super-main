import axios from "axios";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

// Fallback local events data
const LOCAL_EVENTS = [
  {
    id: 1,
    title: "Parent-Teacher Conference",
    date: "May 15, 2025",
    time: "3:00 PM - 7:00 PM",
    location: "School Auditorium",
  },
  {
    id: 2,
    title: "Annual Science Exhibition",
    date: "May 22, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "School Campus",
  },
  {
    id: 3,
    title: "Career Guidance Workshop",
    date: "May 25, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Conference Hall",
  },
  {
    id: 4,
    title: "Annual School Festival",
    date: "June 2, 2025",
    time: "All Day Event",
    location: "School Grounds",
  },
];

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${STRAPI_URL}/api/events?populate=*`, {
      timeout: 5000, // 5 second timeout
    });
    
    // Map Strapi response to component format
    return response.data.data.map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
    }));
  } catch (error) {
    console.warn("Failed to fetch events from Strapi, using local data:", error.message);
    // Return local fallback data
    return LOCAL_EVENTS;
  }
};

import axios from "axios";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

// Fallback data when API is unavailable
const LOCAL_EVENTS = [
  {
    id: 1,
    title: "School Assembly",
    date: "2025-12-25",
    time: "08:00",
    location: "School Main Hall",
  },
  // Add more fallback events as needed
];

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${STRAPI_URL}/api/events?populate=*`, {
      timeout: 5000, // 5 second timeout
    });
    
    // Map Strapi response to component format
    return response.data.data.map((event) => ({
      id: event.id,
      title: event.attributes.title,
      date: event.attributes.date,
      time: event.attributes.time,
      location: event.attributes.location,
    }));
  } catch (error) {
    console.warn("Failed to fetch events from Strapi, using local data:", error.message);
    // Return local fallback data
    return LOCAL_EVENTS;
  }
};

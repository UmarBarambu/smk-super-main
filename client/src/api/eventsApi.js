import axios from "axios";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${STRAPI_URL}/api/events?populate=*`);
    
    // Map Strapi response to component format
    return response.data.data.map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

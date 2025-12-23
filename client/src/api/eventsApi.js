import axios from "axios";

// CMS API base URL from .env
const CMS_API_BASE = import.meta.env.VITE_API_CMS_URL;

// Create an axios instance
const api = axios.create({
  baseURL: CMS_API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch upcoming events from Strapi CMS
export const fetchEvents = async () => {
  try {
    const response = await api.get("/events?populate=*");
    
    // Map Strapi response to component format
    return response.data.data.map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
    }));
  } catch (error) {
    console.error("Failed to fetch events from Strapi:", error.response?.data || error.message);
    return [];
  }
};

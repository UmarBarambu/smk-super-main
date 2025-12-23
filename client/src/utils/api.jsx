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

// Fetch home page data
export const fetchHomepage = async () => {
  try {
    const res = await api.get("/home?populate[Sections][populate]=*");
    return res.data?.data || null;
  } catch (err) {
    console.error("Error fetching homepage:", err.response?.data || err.message);
    return null;
  }
};

// Fetch latest announcement page data
export const fetchLatestAnnouncementPage = async () => {
  try {
    const res = await api.get("/latest-announcement?populate=*");
    return res.data?.data || null;
  } catch (err) {
    console.error(
      "Error fetching latest announcement page:",
      err.response?.data || err.message
    );
    return null;
  }
};

// Fetch upcoming events
export const fetchUpcomingEvents = async () => {
  try {
    const res = await api.get("/events?populate=*");
    return res.data?.data || [];
  } catch (err) {
    console.error(
      "Error fetching events:",
      err.response?.data || err.message
    );
    return [];
  }
};

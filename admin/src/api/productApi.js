import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5002/api";

export const getProducts = async (page = 1, limit = 10, search = "", category = "") => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { page, limit, search, category },
    });
    // Make sure it always returns an object
    return response.data || { products: [], totalPages: 1 };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], totalPages: 1 }; // fallback to avoid TypeError
  }
};

export const getProduct = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

export const createProduct = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/products`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });
  return response.data;
};

export const updateProduct = async (id, formData) => {
  const response = await axios.put(`${API_BASE_URL}/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });
  return response.data;
};

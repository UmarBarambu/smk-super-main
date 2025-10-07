import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("User details: ", user)

  const api_url = "http://localhost:5003/api";   // no3 problem fixed 

  useEffect(() => {
    const token = localStorage.getItem("smk-user-token");
    if (token) {
      fetchProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async (token) => {
    try {
      setLoading(true);
      const res = await axios.get(`${api_url}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     setUser(res.data.user || res.data);
    } catch (err) {
      console.error("Failed to fetch profile", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const signup = async (formData) => {
    try {
     await axios.post(`${api_url}/auth/signup`, formData);
     toast.success("Signup successful. Please log in.");
     return true;
    } catch (err) {
      toast.error(err?.response?.data?.error || "Signup failed.");
      return false;
    }
  };

  const signin = async ({ email, password }) => {
    try {
      const res = await axios.post(`${api_url}/auth/login`, {
        email,
        password,
      });
      const { token, user } = res.data;
      localStorage.setItem("smk-user-token", token);
      setUser(user);
      toast.success("Login successful!");
      return true;
    } catch (err) {
      toast.error(err?.response?.data?.error || "Login failed.");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("smk-user-token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signin,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
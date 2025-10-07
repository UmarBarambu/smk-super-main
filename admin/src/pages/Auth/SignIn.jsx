import React, { useState } from "react";
import { GraduationCap, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

import logo from "../../assets/images/logo.png";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = formData;

    try {
      // Use the API URL from environment variables
      const api_url = `${import.meta.env.VITE_API_URL}/auth/admin/login`;

      // Make the API request to log in
      const response = await axios.post(api_url, { email, password });

      // Handle successful login
      const { token } = response.data;
      localStorage.setItem("adminToken", token); // Save token
      toast.success("Login successful");
      window.location.href = "/"; // Redirect to the dashboard
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error); // Display server error message
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-blue-100">
        {/* School Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
            <img src={logo} alt="logo" />
          </div>
          <h1 className="text-2xl font-bold text-blue-900 mb-1">Admin Portal</h1>
          <p className="text-blue-600 text-sm">School Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-blue-50/30"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-blue-50/30"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-blue-700">
              <input
                type="checkbox"
                className="mr-2 w-4 h-4 text-blue-600 bg-blue-50 border-blue-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-md"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing In...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-blue-500">
            Secure Admin Access • School Management Portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
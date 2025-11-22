import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Shield,
  Edit2,
  Save,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch admin profile on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const api_url = import.meta.env.VITE_API_URL || "http://localhost:5002/api";
    const token = localStorage.getItem("adminToken");
    try {
      setLoading(true);
      // Use the general profile endpoint so any logged-in user can load their profile
      const response = await fetch(`${api_url}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfile(data.user);
      setEditedProfile({
        ...data.user,
        password: "",
        confirmPassword: "",
      });
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to load profile. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    const api_url = import.meta.env.VITE_API_URL || "http://localhost:5002/api";
    try {
      setSaving(true);
      setMessage({ type: "", text: "" });

      // Validate password confirmation if password is being changed
      if (
        editedProfile.password &&
        editedProfile.password !== editedProfile.confirmPassword
      ) {
        setMessage({ type: "error", text: "Passwords do not match!" });
        setSaving(false);
        return;
      }

      // Prepare data for API call (exclude confirmPassword)
      const {  ...updateData } = editedProfile;

      // Only include password if it's being changed
      if (!updateData.password) {
        delete updateData.password;
      }

      const token = localStorage.getItem("adminToken");

      // If the logged-in user is an admin (principal/school_admin) call the admin PUT
      // otherwise call the general PUT /auth/profile which updates own profile without role changes
      let response;
      if (profile.role === "principal" || profile.role === "school_admin") {
        response = await fetch(`${api_url}/auth/admin/profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        });
      } else {
        // Ensure role isn't sent for non-admin update
        delete updateData.role;
        response = await fetch(`${api_url}/auth/profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedData = await response.json();
      setProfile(updatedData.user);
      setEditedProfile({
        ...updatedData.user,
        password: "",
        confirmPassword: "",
      });
      setEditMode(false);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to update profile. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile({
      ...profile,
      password: "",
      confirmPassword: "",
    });
    setEditMode(false);
    setMessage({ type: "", text: "" });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const clearMessage = () => {
    setMessage({ type: "", text: "" });
  };


  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading profile...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 rounded-full p-2">
                <User className="h-6 w-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-semibold text-white">
                Admin Profile
              </h1>
            </div>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md flex items-center transition-colors"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Message Display */}
        {message.text && (
          <div
            className={`px-6 py-3 border-l-4 ${
              message.type === "success"
                ? "bg-green-50 border-green-400"
                : "bg-red-50 border-red-400"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {message.type === "success" ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )}
                <span
                  className={`ml-2 text-sm font-medium ${
                    message.type === "success"
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {message.text}
                </span>
              </div>
              <button
                onClick={clearMessage}
                className={`${
                  message.type === "success"
                    ? "text-green-600 hover:text-green-800"
                    : "text-red-600 hover:text-red-800"
                } transition-colors`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Profile Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Name Field */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                {editMode ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profile.name}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                {editMode ? (
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profile.email}</p>
                )}
              </div>
            </div>

            {/* Role Field */}

            {/* Password Field */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                {editMode ? (
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={editedProfile.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter new password (leave blank to keep current)"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {editedProfile.password && (
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={editedProfile.confirmPassword}
                          onChange={(e) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                          className={`w-full px-3 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            editedProfile.password &&
                            editedProfile.confirmPassword &&
                            editedProfile.password !==
                              editedProfile.confirmPassword
                              ? "border-red-300 focus:ring-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    )}
                    {editedProfile.password &&
                      editedProfile.confirmPassword &&
                      editedProfile.password !==
                        editedProfile.confirmPassword && (
                        <p className="text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Passwords do not match
                        </p>
                      )}
                    {editedProfile.password &&
                      editedProfile.confirmPassword &&
                      editedProfile.password ===
                        editedProfile.confirmPassword && (
                        <p className="text-sm text-green-600 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Passwords match
                        </p>
                      )}
                  </div>
                ) : (
                  <p className="text-gray-900 py-2">••••••••••••</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {editMode && (
            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleCancel}
                disabled={saving}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}

          
        </div>
      </div>
    </div>
  );
};

export default Profile;

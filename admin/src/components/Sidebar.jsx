import React from "react";
import {
  FaUser,
  FaDoorOpen,
  FaCalendarAlt,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FaStore } from "react-icons/fa6";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/signin";
  };

  // Try to read role from JWT stored in localStorage
  const getRoleFromToken = () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.role;
    } catch {
      return null;
    }
  };

  let role = getRoleFromToken();
  // normalize stored DB role name to a friendly role key
  if (role === "cooperation_store_admin") role = "store_admin";

  // Default: show everything
  let allowed = [
    "dashboard",
    "rooms",
    "users",
    "pibg",
    "schoolShop",
    "profile",
  ];

  if (role === "room_supervisor") {
    allowed = ["dashboard", "rooms", "profile"]; // Room Bookings + Rooms
  } else if (role === "pta_treasurer") {
    allowed = ["pibg", "profile"]; // PIBG only
  } else if (role === "store_admin") {
    allowed = ["schoolShop", "profile"]; // School Shop only
  }

  return (
    <div className="bg-gray-800 text-white w-fit md:w-60 h-screen space-y-6">
      <h2 className="text-xl md:text-2xl font-bold p-5">Admin</h2>
      <div className="space-y-4">
        {allowed.includes("dashboard") && (
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`${activeTab == "dashboard" ? "bg-gray-500" : "bg-transparent"} flex items-center gap-2 hover:bg-gray-500 py-2 rounded p-5 w-full cursor-pointer`}
          >
            <FaCalendarAlt /> <span className="hidden md:block">Room Bookings</span>
          </button>
        )}

        {allowed.includes("rooms") && (
          <button
            onClick={() => setActiveTab("rooms")}
            className={`${activeTab == "rooms" ? "bg-gray-500" : "bg-transparent"} flex items-center gap-2 hover:bg-gray-500 py-2 rounded p-5 w-full cursor-pointer`}
          >
            <FaDoorOpen /> <span className="hidden md:block">Rooms</span>
          </button>
        )}

        {allowed.includes("users") && (
          <button
            onClick={() => setActiveTab("users")}
            className={`${activeTab == "users" ? "bg-gray-500" : "bg-transparent"} flex items-center gap-2 hover:bg-gray-500 py-2 rounded p-5 w-full cursor-pointer`}
          >
            <FaUsers /> <span className="hidden md:block">Users</span>
          </button>
        )}

        {allowed.includes("pibg") && (
          <button
            onClick={() => setActiveTab("pibg")}
            className={`${activeTab == "pibg" ? "bg_gray-500" : "bg-transparent"} flex items-center gap-2 hover:bg-gray-500 py-2 rounded p-5 w-full cursor-pointer`}
          >
            <MdPayment /> <span className="hidden md:block">PIBG</span>
          </button>
        )}

        {allowed.includes("schoolShop") && (
          <button
            onClick={() => setActiveTab("schoolShop")}
            className={`${activeTab == "schoolShop" ? "bg-gray-500" : "bg-transparent"} flex items-center gap-2 hover:bg-gray-500 py-2 rounded p-5 w-full cursor-pointer`}
          >
            <FaStore /> <span className="hidden md:block">School Shop</span>
          </button>
        )}

        {allowed.includes("profile") && (
          <button
            onClick={() => setActiveTab("profile")}
            className={`${activeTab == "profile" ? "bg-gray-500" : "bg-transparent"} flex items-center gap-2 hover:bg-gray-500 py-2 rounded p-5 w-full cursor-pointer`}
          >
            <FaUser /> <span className="hidden md:block">Profile</span>
          </button>
        )}

        <button
          onClick={logout}
          className="flex items-center gap-2 hover:bg-gray-500 py-2 rounded p-5 w-full cursor-pointer"
        >
          <FaSignOutAlt /> <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

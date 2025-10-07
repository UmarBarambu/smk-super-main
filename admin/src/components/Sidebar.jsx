import React from "react";
import {
  FaUser,
  FaDoorOpen,
  FaCalendarAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FaStore } from "react-icons/fa6";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/signin";
  };
  return (
    <div className="bg-gray-800 text-white w-fit md:w-60 h-screen space-y-6">
      <h2 className="text-xl md:text-2xl font-bold p-5">Admin</h2>
      <div className="space-y-4">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`${
            activeTab == "dashboard" ? "bg-gray-500" : "bg-transparent"
          } flex items-center gap-2 hover:bg-gray-500 py-2 rounded p-5 w-full cursor-pointer`}
        >
          <FaCalendarAlt />{" "}
          <span className="hidden md:block">Room Bookings</span>
        </button>
        <button
          onClick={() => setActiveTab("rooms")}
          className={`${
            activeTab == "rooms" ? "bg-gray-500" : "bg-transparent"
          } flex items-center gap-2 hover:bg-gray-500 py-2 rounded p-5 w-full cursor-pointer`}
        >
          <FaDoorOpen /> <span className="hidden md:block">Rooms</span>
        </button>
        <button
          onClick={() => setActiveTab("pibg")}
          className={`${
            activeTab == "pibg" ? "bg-gray-500" : "bg-transparent"
          } flex items-center gap-2 hover:bg-gray-500 py-2 rounded p-5 w-full cursor-pointer`}
        >
          <MdPayment /> <span className="hidden md:block">PIBG</span>
        </button>
        <button
          onClick={() => setActiveTab("schoolShop")}
          className={`${
            activeTab == "schoolShop" ? "bg-gray-500" : "bg-transparent"
          } flex items-center gap-2 hover:bg-gray-500 py-2 rounded p-5 w-full cursor-pointer`}
        >
          <FaStore /> <span className="hidden md:block">School Shop</span>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`${
            activeTab == "profile" ? "bg-gray-500" : "bg-transparent"
          } flex items-center gap-2 hover:bg-gray-500 py-2 rounded p-5 w-full cursor-pointer`}
        >
          <FaUser /> <span className="hidden md:block">Profile</span>
        </button>
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

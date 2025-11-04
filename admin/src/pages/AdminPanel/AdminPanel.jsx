import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaUser, FaTrash , FaComments } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Pibg from "../Pibg/Pibg";
import { MdConstruction } from "react-icons/md";
import SchoolShopAdmin from "../../components/Shop/Shop";
import Profile from "../Profile/Profile";
import { useTranslation } from "react-i18next";
import TextareaAutosize from "react-textarea-autosize";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [activeTab, setActiveTab] = useState("dashboard");
  const [bookings, setBookings] = useState([]);
  console.log(bookings);
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    name: "",
    type: "library",
    capacity: 100,
  });
  const [loading, setLoading] = useState(false); // Loader state
  const [deletingBookingId, setDeletingBookingId] = useState(null);
  const [roomTypeFilter, setRoomTypeFilter] = useState("all");
  const { t, i18n } = useTranslation();
   
// 💬 Chat states
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [allChats, setAllChats] = useState([]);





  useEffect(() => {
    setToken(localStorage.getItem("adminToken"));

    if (!token) {
      toast.error("Unauthorized! Please log in.");
      navigate("/signin");
      return;
    }

    const validateToken = async () => {
      try {
        setLoading(true); // Show loader
        const api_url = import.meta.env.VITE_API_URL;
        await axios.get(`${api_url}/auth/validate`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchData(token);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        toast.error("Session expired! Please log in again.");
        localStorage.removeItem("adminToken");
        navigate("/signin");
      } finally {
        setLoading(false); // Hide loader
      }
    };

    validateToken();
  }, [navigate]);

  const fetchData = async (token) => {
    try {
      setLoading(true); // Show loader
      const api_url = import.meta.env.VITE_API_URL;
      const [bRes, rRes] = await Promise.all([
        axios.get(`${api_url}/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${api_url}/rooms`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setBookings(bRes.data);
      setRooms(rRes.data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleRoomCreate = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      setLoading(true); // Show loader
      const api_url = import.meta.env.VITE_API_URL;
      await axios.post(`${api_url}/rooms`, newRoom, {
        headers,
      });
      toast.success("Room added");
      fetchData(token);
    } catch (err) {
      toast.error(err.response?.data?.error || "Room add failed");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleRoomDelete = async (id) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      setLoading(true); // Show loader
      const api_url = import.meta.env.VITE_API_URL;
      await axios.delete(`${api_url}/rooms/${id}`, { headers });
      toast.success("Room deleted");
      fetchData(token);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Failed to delete room");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleBookingApproval = async (id) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      setLoading(true); // Show loader
      const api_url = import.meta.env.VITE_API_URL;
      await axios.patch(`${api_url}/bookings/${id}/approve`, null, { headers });
      toast.success(`Booking Approved!`);
      fetchData(token);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Failed to update booking status");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleBookingRejection = async (id) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      setLoading(true); // Show loader
      const api_url = import.meta.env.VITE_API_URL;
      await axios.patch(`${api_url}/bookings/${id}/reject`, null, { headers });
      toast.success(`Booking Rejected!`);
      fetchData(token);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Failed to update booking status");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleBookingDelete = async (id) => {
    const headers = { Authorization: `Bearer ${token}` };
    if (
      !window.confirm(
        "Are you sure you want to delete this booking? This action cannot be undone."
      )
    )
      return;
    try {
      setLoading(true);
      setDeletingBookingId(id);
      const api_url = import.meta.env.VITE_API_URL;
      await axios.delete(`${api_url}/bookings/${id}`, { headers });
      toast.success("Booking deleted");
      fetchData(token);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Failed to delete booking");
    } finally {
      setLoading(false);
      setDeletingBookingId(null);
    }
  };

// 🧩 Chat functions
  const loadAllChats = async () => {
    try {
      const api_url = import.meta.env.VITE_API_URL;
      const res = await axios.get(`${api_url}/chat/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllChats(res.data);
    } catch {
      toast.error("Failed to load chats");
    }
  };

  const loadUserChat = async (userId) => {
    try {
      const api_url = import.meta.env.VITE_API_URL;
      const res = await axios.get(`${api_url}/chat/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChatMessages(res.data?.messages || []);
      setSelectedUser(userId);
    } catch {
      toast.error("Failed to load chat");
    }
  };

  

const textareaRef = useRef(null);

// After newMessage updates (or after rendering)
useEffect(() => {
  if (textareaRef.current) {
    textareaRef.current.focus();
  }
}, [selectedUser, chatMessages]);


const sendMessage = async () => {
  if (!newMessage.trim() || !selectedUser) return;

  const msg = { text: newMessage, sender: "admin" };
  
  // Optimistic UI update
  setChatMessages((prev) => [...prev, { ...msg, timestamp: new Date() }]);
  
  setNewMessage(""); // clear input after updating state

  try {
    const api_url = import.meta.env.VITE_API_URL;
    await axios.post(
      `${api_url}/chat/send`,
      { ...msg, userId: selectedUser },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch {
    toast.error("Failed to send message");
  }
};

  // 💬 Chat Popup
  const ChatPopup = () => (
    <div className="fixed bottom-20 right-6 w-[500px] bg-white shadow-lg rounded-lg border flex h-[500px]">
      {/* Sidebar: User list */}
      <div className="w-1/3 border-r p-3 bg-gray-100 overflow-y-auto">
        <h3 className="font-semibold mb-2 flex items-center gap-2 text-blue-600">
          <FaComments /> Users
        </h3>
        {allChats.length === 0 ? (
          <p className="text-gray-400 text-sm">No chats yet</p>
        ) : (
          allChats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => loadUserChat(chat.userId._id)}
              className={`p-2 mb-1 rounded cursor-pointer hover:bg-blue-100 ${
                selectedUser === chat.userId._id ? "bg-blue-200" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <FaUser className="text-gray-600" />
                <span className="text-sm font-medium">{chat.userId.name}</span>
              </div>
              <p className="text-xs text-gray-500 truncate">
                {chat.messages?.slice(-1)[0]?.text || "No messages"}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Chat content */}
      <div className="flex-1 flex flex-col">
        <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
          <span className="font-semibold">
            {selectedUser
              ? `Chat with ${
                  allChats.find((c) => c.userId._id === selectedUser)?.userId
                    ?.name
                }`
              : "Select a user"}
          </span>
          <button onClick={() => setShowChat(false)} className="text-white">
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
          {chatMessages.length === 0 && (
            <p className="text-gray-400 text-sm text-center">
              {selectedUser ? "No messages yet" : "Select a user to start chat"}
            </p>
          )}
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "admin" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-lg text-sm max-w-[70%] break-words ${
                  msg.sender === "admin"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

       {selectedUser && (
  <div className="p-3 border-t flex gap-2 items-end">
   <textarea
  ref={textareaRef}
  value={newMessage}
  onChange={(e) => setNewMessage(e.target.value)}
  className="border p-2 rounded ltr"
/>
    <button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Send</button>
  </div>
)}
      </div>
    </div>
  );

  // 🔹 Header
  const Header = () => (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <img src={logo} alt="logo" width={50} />
      <div className="flex items-center gap-6">
        {/* Language Switcher */}
        <select
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          className="border rounded px-2 py-1"
          defaultValue={i18n.language}
        >
          <option value="en">English</option>
          <option value="ms">Bahasa Melayu</option>
        </select>

        {/* 💬 Chat Icon */}
        <button
          onClick={() => {
            setShowChat(!showChat);
            if (!showChat) loadAllChats(); // ✅ Correct function called
          }}
          className="relative text-gray-700 hover:text-blue-600"
        >
          <FaComments className="text-2xl" />
        </button>

        <span className="text-gray-700 text-lg font-medium">
          Welcome, Admin
        </span>

        {/* Account Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-2 text-gray-700 hover:text-blue-700">
            <FaUser className="text-xl" />
            <span>{t("profile")}</span>
          </button>
          <ul className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md border hidden group-hover:block">
            <li className="p-2 hover:bg-gray-100 cursor-pointer">
              {t("profile")}
            </li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">
              {t("settings")}
            </li>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer text-red-600"
              onClick={() => {
                localStorage.removeItem("adminToken");
                toast.success(t("logout"));
                navigate("/signin");
              }}
            >
              {t("logout")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Room type options
  const roomTypeOptions = [
    { value: "all", label: "All Types" },
    {
      value: "Seminar Room 1 (Bilik Seminar)",
      label: "Seminar Room 1 (Bilik Seminar)",
    },
    {
      value: "Main Meeting Room (Bilik Mesyuarat Utama)",
      label: "Main Meeting Room (Bilik Mesyuarat Utama)",
    },
    {
      value: "Library and Resource Center (Perpustakaan dan Pusat Sumber)",
      label: "Library and Resource Center (Perpustakaan dan Pusat Sumber)",
    },
    { value: "Smart Room", label: "Smart Room" },
  ];

  // Filtered bookings
  const filteredBookings = bookings.filter((b) => {
    if (roomTypeFilter === "all") return true;
    return b.roomId?.name === roomTypeFilter;
  });

  return (
  <div className="flex h-screen">
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
    <div className="flex-1 flex flex-col ">
      <Header />
      <main className="p-6 overflow-y-auto">
        {loading && (
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="loader border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>

            <p className="text-gray-600 mt-6 text-center">{t("pleaseWait")}</p>
          </div>
        )}
        {!loading && activeTab === "dashboard" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t("allBookings")}</h2>
            {/* Room Type Filter */}
            <div className="mb-4 flex items-center gap-2">
              <label
                htmlFor="roomTypeFilter"
                className="font-medium text-gray-700"
              >
                {t("filterByRoom")}
              </label>
              <select
                id="roomTypeFilter"
                value={roomTypeFilter}
                onChange={(e) => setRoomTypeFilter(e.target.value)}
                className="border px-2 py-1 rounded"
              >
                {roomTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="overflow-x-scroll">
              <table className="w-full text-sm border">
                <thead className="bg-gray-100">
                  <tr>
                    <th>{t("user")}</th>
                    <th>{t("room")}</th>
                    <th>{t("title")}</th>
                    <th>{t("pic")}</th>
                    <th>{t("date")}</th>
                    <th>{t("slot")}</th>
                    <th>{t("status")}</th>
                    <th>{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b) => (
                    <tr key={b._id} className="border-t text-center">
                      <td className="p-2">{b.userId?.name}</td>
                      <td>{b.roomId?.name}</td>
                      <td>{b.title}</td>
                      <td>{b.pic}</td>
                      <td>{new Date(b.date).toLocaleDateString()}</td>
                      <td>{b.timeSlot}</td>
                      <td
                        className={`p-2 font-semibold ${
                          b.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : b.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {b.status}
                      </td>
                      <td className="p-2">
                        {b.status === "pending" && (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleBookingApproval(b._id)}
                              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                            >
                              {t("approve")}
                            </button>
                            <button
                              onClick={() => handleBookingRejection(b._id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                              {t("reject")}
                            </button>
                          </div>
                        )}
                        <button
                          onClick={() => handleBookingDelete(b._id)}
                          disabled={deletingBookingId === b._id}
                          className="mt-1 text-red-600 hover:text-red-800 text-lg p-1 rounded-full focus:outline-none"
                          title={t("delete")}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {!loading && activeTab === "rooms" && (
          <section className="overflow-x-scroll">
            <h2 className="text-2xl font-semibold mb-4">{t("manageRooms")}</h2>
            <div className="flex gap-2 mb-4">
              <input
                placeholder={t("name")}
                value={newRoom.name}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, name: e.target.value })
                }
                className="border px-2 py-1 rounded"
              />
              <select
                value={newRoom.type}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, type: e.target.value })
                }
                className="border px-2 py-1 rounded"
              >
                <option value="library">{t("library")}</option>
                <option value="meeting">{t("meeting")}</option>
                <option value="special">{t("special")}</option>
              </select>
              <input
                type="number"
                placeholder={t("capacity")}
                value={newRoom.capacity}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, capacity: e.target.value })
                }
                className="border px-2 py-1 rounded"
              />
              <button
                onClick={handleRoomCreate}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                {t("add")}
              </button>
            </div>
            <ul className="space-y-2">
              {rooms.map((r) => (
                <li
                  key={r._id}
                  className="flex justify-between border px-3 py-2 rounded hover:bg-gray-300 duration-500"
                >
                  <span>
                    {r.name} ({t("type")} - {r.type}, {t("capacity")} - {r.capacity})
                  </span>
                  <button
                    onClick={() => handleRoomDelete(r._id)}
                    className="text-red-600 cursor-pointer"
                  >
                    {t("delete")}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {!loading && activeTab === "pibg" && <Pibg />}
        {!loading && activeTab === "schoolShop" && <SchoolShopAdmin />}
        {!loading && activeTab === "profile" && <Profile />}
      </main>
       {/* 💬 Show Chat Popup */}
        {showChat && <ChatPopup />}
    </div>
  </div>
  
);
};

export default AdminPanel;



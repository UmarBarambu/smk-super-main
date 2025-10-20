import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Send, Eye, User, Mail, Phone, Package, Image, X, LogOut, Clock, CheckCircle, XCircle } from "lucide-react"; // 👈 added LogOut icon
import { io } from "socket.io-client";



const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showChat, setShowChat] = useState(false);  // 👈 Chat box state
  const [chatMessages, setChatMessages] = useState([]); // 👈 store messages
  const [newMessage, setNewMessage] = useState(""); // 👈 message input
  const textareaRef = React.useRef(null); // 👈 add textarea ref
  const [unreadCount, setUnreadCount] = useState(0);



  const { user, setUser } = useContext(AuthContext); // 👈 add setUser if available
  const navigate = useNavigate();
  const api_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("smk-user-token");
        if (!token) {
          console.warn("No token found");
          setOrders([]);
          setLoading(false);
          return;
        }

        const response = await axios.get(`${api_url}/order/my-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  // 🔒 Logout handler
  const handleLogout = () => {
    localStorage.removeItem("smk-user-token");
    if (setUser) setUser(null); // clear context if supported
    navigate("/signin");
  };

  const closeModals = () => {
    setSelectedOrder(null);
    setShowOrderDetails(false);
    setShowReceiptModal(false);
  };

  const formatCurrency = (amount) => `RM ${amount?.toFixed(2) || "0.00"}`;
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const getStatusIcon = (status, iconColor = "text-gray-400") => {
    switch (status) {
      case "pending":
        return <Clock className={`w-4 h-4 ${iconColor}`} />;
      case "approved":
        return <CheckCircle className={`w-4 h-4 ${iconColor}`} />;
      case "rejected":
        return <XCircle className={`w-4 h-4 ${iconColor}`} />;
      default:
        return <Clock className={`w-4 h-4 ${iconColor}`} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return {
          text: "text-yellow-700",
          bg: "bg-yellow-100",
          icon: "text-yellow-500",
        };
      case "approved":
        return {
          text: "text-green-700",
          bg: "bg-green-100",
          icon: "text-green-500",
        };
      case "rejected":
        return {
          text: "text-red-700",
          bg: "bg-red-100",
          icon: "text-red-500",
        };
      default:
        return {
          text: "text-gray-700",
          bg: "bg-gray-100",
          icon: "text-gray-400",
        };
    }
  };


  const rawApiUrl = import.meta.env.VITE_API_URL;
  const baseUrl = rawApiUrl.replace(/\/api\/?$/, "");
  const socket = React.useRef(null);




  const getReceiptUrl = (filename) => {
    if (!filename) return "";
    const cleanFilename = filename.replace(/^store-receipt\//, "");
    return `${baseUrl}/store-receipt/${cleanFilename}`;
  };

  const isImage = (filename) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(filename);
  const isPDF = (filename) => /\.pdf$/i.test(filename);


 



  // Load chat messages
  useEffect(() => {
    if (!user) return;
    const fetchChat = async () => {
      try {
        const token = localStorage.getItem("smk-user-token");
        const { data } = await axios.get(`${api_url}/chat/my-chat`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChatMessages(data.messages || []);
      } catch (err) {
        console.error("Error loading chat:", err);
      }
    };
    fetchChat();
  }, [user]); // 👈 re-fetch when user changes


  // 🪄 Auto-expand textarea height
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // reset
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // grow up to 200px
    }
  }, [newMessage]);


  
const sendMessage = async () => {
  if (!newMessage.trim()) return;

  const tempId = Date.now().toString();
  const tempMsg = {
    _id: tempId,
    text: newMessage,
    sender: "user",
    timestamp: new Date(),
  };

  setChatMessages((prev) => [...prev, tempMsg]);
  setNewMessage("");

  try {
    const token = localStorage.getItem("smk-user-token");

    const { data } = await axios.post(
      `${api_url}/chat/send`,
      { text: newMessage, sender: "user" },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const realMessage = data.messages[data.messages.length - 1];

    setChatMessages((prev) =>
      prev.map((m) => (m._id === tempId ? realMessage : m))
    );

    // ✅ Emit full message object to admin
    if (socket.current) {
      socket.current.emit("send_message", {
        receiver: "admin",
         message: {
      ...realMessage,
      senderId: data.userId, // or whatever field identifies the user
    },
      });
    }
  } catch (err) {
    console.error("❌ Failed to send message:", err);
    toast.error("Failed to send message");
    setChatMessages((prev) => prev.filter((m) => m._id !== tempId));
  }
};

 useEffect(() => {
  const token = localStorage.getItem("smk-user-token");
  if (!token) return;

  socket.current = io(baseUrl, {
    auth: { token },
    transports: ["websocket"],
  });

  socket.current.on("connect", () => {
    console.log("✅ Socket connected:", socket.current.id);
  });

  socket.current.on("disconnect", () => {
    console.log("❌ Socket disconnected");
  });

  socket.current.on("receive_message", (message) => {
  console.log("📩 Received message via socket:", message);

  // 🧠 Ignore messages sent by this same user
  if (message.sender === "user") return;

  setChatMessages((prev) => [...prev, message]);

  if (!showChat) {
    setUnreadCount((prev) => prev + 1);
  }
});



  // ✅ Receive message deletions
  socket.current.on("message_deleted", ({ messageId }) => {
    console.log("🗑 Message deleted (socket):", messageId);
    setChatMessages((prev) => prev.filter((msg) => msg._id !== messageId));
  });

  return () => {
    socket.current.disconnect();
  };
}, [baseUrl]);


// ✅ Delete message and notify socket
const deleteMessage = async (messageId) => {
  if (!messageId) return console.warn("Cannot delete: missing message ID");

  try {
    const token = localStorage.getItem("smk-user-token");

    await axios.delete(`${api_url}/chat/delete/${messageId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Update UI instantly
    setChatMessages((prev) => prev.filter((msg) => msg._id !== messageId));

    // Notify admin via socket
    socket.current.emit("message_deleted", { messageId });
  } catch (err) {
    console.error("Error deleting message:", err);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="max-w-6xl mx-auto py-12 px-4 relative flex justify-between">
        {/* 🔒 Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md shadow-sm"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </button>

        {/* 💬 Chat Button */}
        {/* 💬 Chat Button with unread badge */}
        <button
          onClick={() => {
            setShowChat(!showChat);
            setUnreadCount(0); // reset unread count when opening chat
          }}
          className="relative flex items-center text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md shadow-sm"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Chat
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}
        </button>

      </div>

      {/* 🪟 Chat Box Popup */}
      {showChat && (
        <div className="fixed bottom-6 right-6 bg-white shadow-lg rounded-lg w-100 max-h-[500px] flex flex-col overflow-hidden border border-gray-200 z-[10000]">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <h3 className="text-lg font-medium">Customer Support</h3>
            <button onClick={() => setShowChat(false)} className="text-white hover:text-gray-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {chatMessages.length === 0 && (
              <p className="text-gray-400 text-sm text-center">No messages yet</p>
            )}

            {chatMessages
              .filter((msg) => !msg.deleted) // <-- only show messages not deleted
              .map((msg, idx) => (
                <div
                  key={msg._id || idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="relative group max-w-[75%]">
                    <div
                      className={`px-3 py-2 rounded-lg text-sm break-words ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                        }`}
                    >
                      {msg.text}
                    </div>

                    {(msg.sender === "user") && (
                      <button
                        onClick={() => deleteMessage(msg._id)}
                        className="absolute -top-2 -right-2 hidden group-hover:flex items-center justify-center bg-red-600 text-white rounded-full w-4 h-4 text-xs"
                        title="Delete message"
                      >
                        ×
                      </button>
                    )}

                  </div>
                </div>
              ))}
          </div>
          <div className="border-t p-2 flex items-end space-x-2 bg-white">
            <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (newMessage.trim()) {
                    sendMessage(newMessage);
                    setNewMessage("");
                  }
                } 
              }}
              placeholder="Type a message..."
              rows={1}
              className="flex-1 border rounded-2xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden leading-5"
              style={{
                maxHeight: "200px",
                minHeight: "40px",
                lineHeight: "1.5",
              }}
            />

            <button
              onClick={() => {
                if (newMessage.trim()) {
                  sendMessage(newMessage);
                  setNewMessage("");
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 🛒 My Purchases Section */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">My Purchases</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
            You haven’t made any purchases yet.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    View
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {order._id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {order.cartItems.length} item
                      {order.cartItems.length > 1 ? "s" : ""}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="px-6 py-4">
                      {(() => {
                        const colors = getStatusColor(order.status);
                        return (
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.text} ${colors.bg}`}
                          >
                            {getStatusIcon(order.status, colors.icon)}
                            <span className="ml-1 capitalize">{order.status}</span>
                          </span>
                        );
                      })()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowOrderDetails(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 🧾 Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
              <button onClick={closeModals} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info + Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Customer Information
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-500" />{" "}
                      {selectedOrder.user.name}
                    </p>
                    <p className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />{" "}
                      {selectedOrder.user.email}
                    </p>
                    <p className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />{" "}
                      {selectedOrder.phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Order Information
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                    {(() => {
                      const colors = getStatusColor(selectedOrder.status);
                      return (
                        <p className="flex items-center">
                          <strong className="mr-2">Status:</strong>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.text} ${colors.bg}`}
                          >
                            {getStatusIcon(selectedOrder.status, colors.icon)}
                            <span className="ml-1 capitalize">{selectedOrder.status}</span>
                          </span>
                        </p>
                      );
                    })()}
                    <p><strong>Date:</strong> {formatDate(selectedOrder.createdAt)}</p>
                    <p><strong>Total:</strong> {formatCurrency(selectedOrder.totalAmount)}</p>
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Product</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Quantity</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Unit Price</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.cartItems.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm text-gray-900">{item.productName}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{formatCurrency(item.unitPrice)}</td>
                          <td className="px-4 py-2 text-sm font-medium text-gray-900">
                            {formatCurrency(item.quantity * item.unitPrice)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment Info & Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><strong>Payment Method:</strong> {selectedOrder.paymentNarration}</p>
                    {selectedOrder.receiptImage && (
                      <div>
                        <span className="font-medium">Receipt:</span>
                        <button
                          onClick={() => {
                            const receiptUrl = getReceiptUrl(selectedOrder.receiptImage);
                            window.open(receiptUrl, "_blank");
                          }}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Image className="w-4 h-4 mr-1" /> View Receipt
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Notes</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {selectedOrder.userNote || "No additional notes provided"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyOrders;

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Main component for the Room Booking System
export default function RoomBookingSystem() {
  // State for the current active tab
  const [activeTab, setActiveTab] = useState("book");
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingFetchRooms, setLoadingFetchRooms] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [maxAttendees, setMaxAttendees] = useState(0);
  console.log(rooms);

  // Check for token and redirect if missing
  useEffect(() => {
    const token = localStorage.getItem("smk-user-token");
    if (!token) {
      navigate("/signin"); // Redirect to signin page if no token is found
    } else {
      fetchRooms();
    }
  }, [navigate]);

  const fetchRooms = async () => {
    try {
      setLoadingFetchRooms(true);
      const api_url = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("smk-user-token");

      const response = await axios.get(`${api_url}/rooms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRooms(response.data);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
      toast.error("Failed to fetch rooms. Please try again later.");
    } finally {
      setLoadingFetchRooms(false);
    }
  };

  // Fetch user's bookings
  const fetchMyBookings = async () => {
    try {
      setLoadingBookings(true); // Start loading
      const api_url = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("smk-user-token");

      const response = await axios.get(`${api_url}/bookings/my-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMyBookings(response.data); // Update the bookings state
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      toast.error("Failed to fetch bookings. Please try again later.");
    } finally {
      setLoadingBookings(false); // Stop loading
    }
  };

  // Fetch bookings when the "My Bookings" tab is active
  useEffect(() => {
    if (activeTab === "mybookings") {
      fetchMyBookings();
    }
  }, [activeTab]);

  // State for form data
  const [formData, setFormData] = useState({
    roomId: "",
    date: "",
    timeSlot: "",
    attendees: "",
    pic: "",
    title: "",
  });

  // State for form submission feedback
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the selected room changes, reset the attendees field
    if (name === "roomId") {
      const selectedRoom = rooms.find((room) => room._id === value);
      setFormData({
        ...formData,
        [name]: value,
        attendees: "", // Reset attendees when room changes
      });
      setMaxAttendees(selectedRoom ? selectedRoom.capacity : 0); // Update max attendees
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent past date booking (extra validation)
    const today = new Date();
    const selectedDate = new Date(formData.date);
    today.setHours(0,0,0,0);
    selectedDate.setHours(0,0,0,0);
    if (selectedDate < today) {
      toast.error("You cannot book a room for a past date.");
      return;
    }

    // Check if all required fields are filled
    if (
      !formData.roomId ||
      !formData.date ||
      !formData.timeSlot ||
      !formData.attendees ||
      !formData.pic ||
      !formData.title
    ) {
      toast.error("Please fill in all the fields.");
      return;
    }

    try {
      const api_url = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("smk-user-token");
      setLoading(true);

      // Send the booking data to the backend
      const response = await axios.post(
        `${api_url}/bookings`,
        {
          roomId: formData.roomId,
          date: formData.date,
          timeSlot: formData.timeSlot,
          attendees: formData.attendees,
          pic: formData.pic,
          title: formData.title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authentication
          },
        }
      );
      // Handle successful booking
      toast.success("Room booking request submitted successfully!");
      setLoading(false);
      setFormSubmitted(true);
      setActiveTab("mybookings");

      // Reset the form after 3 seconds
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          roomId: "",
          date: "",
          timeSlot: "",
          attendees: "",
        });
      }, 3000);
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(`Booking failed: ${error.response.data.error}`);
      } else {
        toast.error("Booking failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Time slot options
  const timeSlots = [
    "From 07:30 To 08:00",
    "From 08:00 To 08:30",
    "From 08:30 To 09:00",
    "From 09:00 To 09:30",
    "From 09:30 To 10:00",
    "From 10:00 To 10:30",
    "From 10:30 To 11:00",
    "From 11:00 To 11:30",
    "From 11:30 To 12:00",
    "From 12:00 To 12:30",
    "From 12:30 To 13:00",
    "From 13:00 To 13:30",
    "From 13:30 To 14:00",
    "From 14:00 To 14:30",
    "From 14:30 To 15:00",
    "From 15:00 To 15:30",
  ];

  // Get status icon based on booking status
  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="text-green-600" />;
      case "rejected":
        return <XCircle className="text-red-600" />;
      case "pending":
      default:
        return <AlertCircle className="text-yellow-500" />;
    }
  };

  // Get status text based on booking status
  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "pending":
      default:
        return "Pending";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-5">
      {/* Header */}
      <header className=" text-blue-950 p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">
            School Room Booking System
          </h1>
          <p className="text-gray-500">
            Book rooms for your events and programs
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-4">
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "book"
                ? "border-b-2 border-yellow-500 text-blue-700"
                : "text-gray-600 hover:text-blue-700"
            }`}
            onClick={() => setActiveTab("book")}
          >
            Book a Room
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "mybookings"
                ? "border-b-2 border-yellow-500 text-blue-700"
                : "text-gray-600 hover:text-blue-700"
            }`}
            onClick={() => setActiveTab("mybookings")}
          >
            My Bookings
          </button>
        </div>

        {/* Book a Room Form */}
        {activeTab === "book" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              Book a Room
            </h2>

            {formSubmitted ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <p className="font-bold">Success!</p>
                <p>
                  Your room booking request has been submitted. You can check
                  its status in the "My Bookings" tab.
                </p>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Room Selection */}
                  <div className="space-y-2">
                    <label
                      htmlFor="roomId"
                      className="text-sm font-medium text-gray-700 flex items-center"
                    >
                      <MapPin size={16} className="mr-1 text-blue-600" />
                      Select Room
                    </label>
                    <select
                      id="roomId"
                      name="roomId"
                      value={formData.roomId}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">-- Select a Room --</option>
                      {rooms.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.name} (Capacity: {room.capacity})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date Selection */}
                  <div className="space-y-2">
                    <label
                      htmlFor="date"
                      className=" text-sm font-medium text-gray-700 flex items-center"
                    >
                      <Calendar size={16} className="mr-1 text-blue-600" />
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Time Slot Selection */}
                  <div className="space-y-2">
                    <label
                      htmlFor="timeSlot"
                      className="text-sm font-medium text-gray-700 flex items-center"
                    >
                      <Clock size={16} className="mr-1 text-blue-600" />
                      Time Slot
                    </label>
                    <select
                      id="timeSlot"
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">-- Select a Time Slot --</option>
                      {timeSlots.map((slot, index) => (
                        <option key={index} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Number of Attendees */}
                  <div className="space-y-2">
                    <label
                      htmlFor="attendees"
                      className=" text-sm font-medium text-gray-700 flex items-center"
                    >
                      <Users size={16} className="mr-1 text-blue-600" />
                      Number of Attendees
                    </label>
                    <input
                      type="number"
                      id="attendees"
                      name="attendees"
                      value={formData.attendees}
                      onChange={handleInputChange}
                      min="1"
                      max={maxAttendees || ""}
                      placeholder={
                        maxAttendees
                          ? `Max: ${maxAttendees}`
                          : "Select a room first"
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      disabled={!formData.roomId}
                    />
                  </div>

                  {/* Title Field */}
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium text-gray-700 flex items-center">
                      Booking Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. Science Club Meeting"
                    />
                  </div>
                  {/* PIC Field */}
                  <div className="space-y-2">
                    <label htmlFor="pic" className="text-sm font-medium text-gray-700 flex items-center">
                      Person In Charge (PIC)
                    </label>
                    <input
                      type="text"
                      id="pic"
                      name="pic"
                      value={formData.pic}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. Mr. Ahmad"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    onClick={handleSubmit}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm flex items-center justify-center transition-colors duration-300"
                  >
                    <span>
                      {loading ? "Loading..." : "Submit Booking Request"}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* My Bookings Tab */}
        {activeTab === "mybookings" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <h2 className="text-xl font-semibold text-blue-800 p-4 border-b border-gray-200">
              My Bookings
            </h2>

            {loadingBookings ? (
              <div className="p-6 text-center text-gray-500">
                <p>Loading bookings...</p>
              </div>
            ) : myBookings.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <p>You don't have any bookings yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Room
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time Slot
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendees
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {myBookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.roomId.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {booking.timeSlot}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {booking.attendees}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm font-medium">
                            <span className="mr-1">
                              {getStatusIcon(booking.status)}
                            </span>
                            <span
                              className={`${
                                booking.status === "approved"
                                  ? "text-green-600"
                                  : booking.status === "rejected"
                                  ? "text-red-600"
                                  : "text-yellow-500"
                              }`}
                            >
                              {getStatusText(booking.status)}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
      {/* Footer */}
      <footer className="bg-blue-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center text-sm">
          <p>© {new Date().getFullYear()} School Room Booking System</p>
          <p className="mt-1">For support, contact the School Admin Office</p>
        </div>
      </footer>
    </div>
  );
}

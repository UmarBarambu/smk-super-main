import { useState, useEffect } from "react";
import { formatBookingDate } from "../../utils/formatDate";
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
  const [roomCalendar, setRoomCalendar] = useState([]); // availability grid for selected room
  const [showDayModal, setShowDayModal] = useState(false);
  const [modalDayData, setModalDayData] = useState(null);
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

  // Calendar month state (first day of month)
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(null);

  const formatDateLocal = (date) => {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Build month calendar (weeks) and fetch bookings for visible range
  const loadMonthCalendar = async (monthDate, roomId) => {
    if (!roomId) return;
    try {
      const year = monthDate.getFullYear();
      const month = monthDate.getMonth();
      const firstOfMonth = new Date(year, month, 1);
      const startWeekDay = firstOfMonth.getDay(); // 0 (Sun) - 6
      const firstCalendarDay = new Date(firstOfMonth);
      firstCalendarDay.setDate(firstOfMonth.getDate() - startWeekDay);

      const lastOfMonth = new Date(year, month + 1, 0);
      const endWeekDay = lastOfMonth.getDay();
      const lastCalendarDay = new Date(lastOfMonth);
      lastCalendarDay.setDate(lastOfMonth.getDate() + (6 - endWeekDay));

      const from = formatDateLocal(firstCalendarDay);
      const to = formatDateLocal(lastCalendarDay);

      const api_url = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem('smk-user-token');
      const resp = await axios.get(`${api_url}/bookings/room/${roomId}?from=${from}&to=${to}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const bookings = resp.data || [];
      const byDate = {};
      bookings.forEach((b) => {
        const d = formatDateLocal(b.date);
        if (!byDate[d]) byDate[d] = [];
        byDate[d].push(b);
      });

      // build days array from firstCalendarDay to lastCalendarDay
      const days = [];
      for (let d = new Date(firstCalendarDay); d <= lastCalendarDay; d.setDate(d.getDate() + 1)) {
        const key = formatDateLocal(d);
        const inMonth = d.getMonth() === month;
        const dayBookings = (byDate[key] || []).map((b) => ({
          start: b.startTime || (b.timeSlot ? parseSlotStart(b.timeSlot) : null),
          end: b.endTime || (b.timeSlot ? parseSlotEnd(b.timeSlot) : null),
          title: b.title,
          attendees: b.attendees,
          status: b.status,
        }));
        const availability = computeDayAvailability(dayBookings);
        days.push({ date: key, displayDate: new Date(d).getDate(), inMonth, bookings: dayBookings, ...availability });
      }

      // group into weeks
      const weeks = [];
      for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
      }

      setRoomCalendar(weeks);
    } catch (err) {
      console.error('Failed to load month calendar', err);
    }
  };

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
    startTime: "",
    endTime: "",
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
      // fetch availability for this room (month view)
      if (value) loadMonthCalendar(currentMonth, value);
    } else {
      // If startTime changes and endTime is not after it, clear endTime
      if (name === "startTime") {
        if (formData.endTime) {
          const [sh, sm] = value.split(":").map(Number);
          const [eh, em] = formData.endTime.split(":").map(Number);
          const startM = sh * 60 + sm;
          const endM = eh * 60 + em;
          if (endM <= startM) {
            setFormData({
              ...formData,
              [name]: value,
              endTime: "",
            });
            return;
          }
        }
      }

      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Fetch bookings for selected room across next 35 days and build availability grid
  const fetchRoomAvailability = async (roomId) => {
    try {
      const api_url = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("smk-user-token");
      const today = new Date();
      const from = formatDateLocal(today);
      const toDate = new Date(today);
      toDate.setDate(toDate.getDate() + 34);
      const to = formatDateLocal(toDate);

      const resp = await axios.get(`${api_url}/bookings/room/${roomId}?from=${from}&to=${to}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const bookings = resp.data || [];
      // group bookings by date
      const byDate = {};
      bookings.forEach((b) => {
        const d = formatDateLocal(b.date);
        if (!byDate[d]) byDate[d] = [];
        byDate[d].push(b);
      });

      // build grid for next 35 days
      const grid = [];
      for (let i = 0; i < 35; i++) {
        const dt = new Date();
        dt.setDate(dt.getDate() + i);
        const key = formatDateLocal(dt);
        const dayBookings = (byDate[key] || []).map((b) => {
          return {
            start: b.startTime || (b.timeSlot ? parseSlotStart(b.timeSlot) : null),
            end: b.endTime || (b.timeSlot ? parseSlotEnd(b.timeSlot) : null),
            title: b.title,
            attendees: b.attendees,
            status: b.status,
          };
        });

        const availability = computeDayAvailability(dayBookings);
        grid.push({ date: key, displayDate: dt.getDate(), bookings: dayBookings, ...availability });
      }
      setRoomCalendar(grid);
    } catch (err) {
      console.error('Failed to fetch room availability', err);
    }
  };

  const parseSlotStart = (slot) => {
    const m = slot && slot.match(/From\s*(\d{2}:\d{2})/i);
    return m ? m[1] : null;
  };
  const parseSlotEnd = (slot) => {
    const m = slot && slot.match(/To\s*(\d{2}:\d{2})/i);
    return m ? m[1] : null;
  };

  // Compute free slots between 08:00 and 22:00 given existing bookings (bookings have start/end strings)
  const computeDayAvailability = (bookings) => {
    const WINDOW_START = '08:00';
    const WINDOW_END = '22:00';
    // ignore rejected bookings — they don't occupy the slot
    const activeBookings = (bookings || []).filter((b) => b.status !== 'rejected');
    const toMinutes = (t) => { const [h,m]=t.split(':').map(Number); return h*60+m; };
    const winStart = toMinutes(WINDOW_START);
    const winEnd = toMinutes(WINDOW_END);

    // if no bookings, entire window is free
    if (!activeBookings || activeBookings.length === 0) {
      return { isFull: false, freeSlots: [[WINDOW_START, WINDOW_END]] };
    }

    // map and sort intervals
    const intervals = activeBookings.map(b => ({
      start: b.start,
      end: b.end,
    })).filter(i => i.start && i.end).map(i => ({
      s: toMinutes(i.start),
      e: toMinutes(i.end),
    })).sort((a,b)=>a.s-b.s);

    // merge overlapping
    const merged = [];
    for (const it of intervals) {
      if (!merged.length || it.s > merged[merged.length-1].e) merged.push({...it});
      else merged[merged.length-1].e = Math.max(merged[merged.length-1].e, it.e);
    }

    // If merged intervals fully cover the window, mark as full
    if (merged.length && merged[0].s <= winStart && merged[merged.length - 1].e >= winEnd) {
      return { isFull: true, freeSlots: [] };
    }

    // compute gaps
    const free = [];
    let cursor = winStart;
    for (const it of merged) {
      if (it.s > cursor) {
        free.push([minutesToClock(cursor), minutesToClock(it.s)]);
      }
      cursor = Math.max(cursor, it.e);
    }
    if (cursor < winEnd) free.push([minutesToClock(cursor), minutesToClock(winEnd)]);

    // consider full if no free slot >= 30 minutes
    const hasFree = free.some(([a,b]) => {
      const am = toMinutes(a); const bm = toMinutes(b); return (bm - am) >= 30;
    });

    return { isFull: !hasFree, freeSlots: free };
  };

  const minutesToClock = (m) => {
    const h = Math.floor(m/60); const mm = m%60; return `${String(h).padStart(2,'0')}:${String(mm).padStart(2,'0')}`;
  };

  const openDayModal = (day) => {
    // navigate to day view page
    if (!formData.roomId) return;
    navigate(`/committee/room-booking-system/room/${formData.roomId}/day/${day.date}`);
  };

  const closeDayModal = () => { setShowDayModal(false); setModalDayData(null); };

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
      !formData.startTime ||
      !formData.endTime ||
      !formData.attendees ||
      !formData.pic ||
      !formData.title
    ) {
      toast.error("Please fill in all the fields.");
      return;
    }

    // validate start/end times
    const [sh, sm] = formData.startTime.split(":").map(Number);
    const [eh, em] = formData.endTime.split(":").map(Number);
    const startMinutes = sh * 60 + sm;
    const endMinutes = eh * 60 + em;
    if (endMinutes <= startMinutes) {
      toast.error("End time must be after start time.");
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
            startTime: formData.startTime,
            endTime: formData.endTime,
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
          startTime: "",
          endTime: "",
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

  // Generate time options from 08:00 to 22:00 in 30-minute steps
  const generateTimeOptions = (start = "08:00", end = "22:00", step = 30) => {
    const opts = [];
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    let cur = sh * 60 + sm;
    const endMinutes = eh * 60 + em;
    while (cur <= endMinutes) {
      const h = Math.floor(cur / 60);
      const m = cur % 60;
      opts.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      cur += step;
    }
    return opts;
  };

  const timeOptions = generateTimeOptions();
  // Start options: remove 22:00 so users can't choose it as a start time
  const startOptions = timeOptions.filter((t) => t !== "22:00");

  // Compute end options so end time starts at 08:30 and is strictly after start time when selected
  const MIN_END = "08:30";
  const endOptions = timeOptions.filter((t) => {
    if (formData.startTime) {
      return t > formData.startTime;
    }
    // when no start selected, only show end times from 08:30 onwards
    return t >= MIN_END;
  });

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
                {/* Calendar month availability for selected room */}
                {formData.roomId && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">Availability — {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</h3>
                      <div className="space-x-2">
                        <button onClick={() => { const prev = new Date(currentMonth); prev.setMonth(prev.getMonth() - 1); setCurrentMonth(prev); loadMonthCalendar(prev, formData.roomId); }} className="px-3 py-1 border rounded">Prev</button>
                        <button onClick={() => { const next = new Date(currentMonth); next.setMonth(next.getMonth() + 1); setCurrentMonth(next); loadMonthCalendar(next, formData.roomId); }} className="px-3 py-1 border rounded">Next</button>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="grid grid-cols-7">
                        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
                          <div key={d} className="bg-[#6b2c1a] text-white text-sm font-semibold py-2 text-center border">{d}</div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-2 mt-2">
                        {roomCalendar.map((week, wi) => (
                          <div key={wi} className="col-span-7 grid grid-cols-7 gap-2">
                            {week.map((day) => (
                              <div
                                key={day.date}
                                onClick={() => { if (day.inMonth) { setSelectedDate(day.date); openDayModal(day); } }}
                                className={`relative min-h-[110px] h-32 p-3 rounded border ${day.inMonth ? '' : 'opacity-50'} ${day.isFull ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'} ${selectedDate === day.date ? 'border-2 border-black' : ''}`}
                              >
                                <div className="absolute top-2 left-3 text-sm font-medium">{day.displayDate}</div>
                                <div className="absolute bottom-3 right-3">
                                  {day.inMonth ? (
                                    <button
                                      onClick={(e) => { e.stopPropagation(); openDayModal(day); }}
                                      className={`text-xs px-3 py-1 rounded-full shadow-md ${day.isFull ? 'bg-red-500 text-white' : 'bg-green-600 text-white'}`}
                                    >
                                      {day.isFull ? 'Full' : 'View'}
                                    </button>
                                  ) : null}
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
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
                      Start Time / End Time
                    </label>
                    <div className="flex gap-2">
                      <select
                        id="startTime"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleInputChange}
                        className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Start</option>
                        {startOptions.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>

                      <select
                        id="endTime"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleInputChange}
                        className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">End</option>
                        {endOptions.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
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
                        Time
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
                            {formatBookingDate(booking.date)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {booking.startTime && booking.endTime
                              ? `From ${booking.startTime} To ${booking.endTime}`
                              : booking.timeSlot}
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

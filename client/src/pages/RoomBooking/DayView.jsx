import { useEffect, useState } from "react";
import { formatBookingDate } from "../../utils/formatDate";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function DayView() {
  const { roomId, date } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (roomId && date) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, date]);

  const loadData = async () => {
    try {
      setLoading(true);
      const api_url = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem('smk-user-token');

      const [roomResp, bookingsResp] = await Promise.all([
        axios.get(`${api_url}/rooms/${roomId}`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${api_url}/bookings/room/${roomId}?from=${date}&to=${date}`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      const roomData = roomResp.data;
      const bookings = bookingsResp.data || [];
      // exclude rejected bookings from the view list
      const visibleBookings = bookings.filter(b => b.status !== 'rejected');

      // Build rows from actual bookings on that date (do not invent slots)
      const parseTime = (b) => {
        const start = b.startTime || (b.timeSlot ? (b.timeSlot.match(/From\s*(\d{2}:\d{2})/i)||[])[1] : null);
        const end = b.endTime || (b.timeSlot ? (b.timeSlot.match(/To\s*(\d{2}:\d{2})/i)||[])[1] : null);
        return { start, end };
      };

      const slotRows = visibleBookings
        .map((b) => {
          const { start, end } = parseTime(b);
          return {
            start,
            end,
            attendees: b.attendees || 0,
            title: b.title,
            applicant: b.userId?.name || b.userId?.email || 'N/A',
            raw: b,
          };
        })
        .filter((r) => r.start && r.end)
        .sort((a, b) => (a.start > b.start ? 1 : -1));

      // compute remaining capacity per booking row (room capacity - attendees for that booking)
      const rowsWithCapacity = slotRows.map((r) => ({
        slot: `From ${r.start} To ${r.end}`,
        remaining: Math.max(0, (roomData.capacity || 0) - (r.attendees || 0)),
        details: `Purpose: ${r.title || 'N/A'} | Applicant: ${r.applicant} | Participants: ${r.attendees || 0}`,
      }));

      setRoom(roomData);
      setSlots(rowsWithCapacity);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load day details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Room: {room?.name || roomId}</h2>
          <p className="text-sm text-gray-600">Date: {formatBookingDate(date)}</p>
        </div>
        <div>
          <button onClick={() => navigate(-1)} className="px-3 py-1 border rounded">Back</button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Time Slot</th>
              <th className="px-4 py-3 text-left">Remaining Capacity</th>
              <th className="px-4 py-3 text-left">Reservation Details</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((r, idx) => (
              <tr key={idx} className={r.details ? 'bg-green-50' : ''}>
                <td className="px-4 py-3 align-top">{r.slot}</td>
                <td className="px-4 py-3 align-top">{r.remaining}</td>
                <td className="px-4 py-3 whitespace-pre-line text-sm">{r.details || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

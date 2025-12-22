import { ChevronRight, MapPin, Clock, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchEvents } from '../../../api/eventsApi';

// Upcoming Events Component
export const UpcomingEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const loadEvents = async () => {
        try {
          setLoading(true);
          const data = await fetchEvents();
          setEvents(data);
        } catch (err) {
          console.error("Failed to load events:", err);
          setError("Failed to load events");
        } finally {
          setLoading(false);
        }
      };

      loadEvents();
    }, []);
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900">Upcoming Events</h2>
            <p className="text-gray-600 mt-2">Stay updated with our school calendar</p>
          </div>

          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading events...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-400 flex">
                <div className="mr-4 bg-blue-900 text-white rounded-lg p-3 h-fit">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-900">{event.title}</h3>
                  <div className="mt-2 space-y-1 text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-yellow-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-yellow-600" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-yellow-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
          
          <div className="mt-8 text-center">
            <a href="/events-calendar" className="inline-flex items-center text-blue-900 font-semibold hover:text-yellow-600 transition-colors">
              View Full Calendar
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    );
  };
  
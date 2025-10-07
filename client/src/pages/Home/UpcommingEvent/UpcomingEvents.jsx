import { ChevronRight, MapPin, Clock, Calendar } from 'lucide-react';

// Upcoming Events Component
export const UpcomingEvents = () => {
    const events = [
      {
        id: 1,
        title: "Parent-Teacher Conference",
        date: "May 15, 2025",
        time: "3:00 PM - 7:00 PM",
        location: "School Auditorium",
      },
      {
        id: 2,
        title: "Annual Science Exhibition",
        date: "May 22, 2025",
        time: "9:00 AM - 4:00 PM",
        location: "School Campus",
      },
      {
        id: 3,
        title: "Career Guidance Workshop",
        date: "May 25, 2025",
        time: "10:00 AM - 12:00 PM",
        location: "Conference Hall",
      },
      {
        id: 4,
        title: "Annual School Festival",
        date: "June 2, 2025",
        time: "All Day Event",
        location: "School Grounds",
      },
    ];
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900">Upcoming Events</h2>
            <p className="text-gray-600 mt-2">Stay updated with our school calendar</p>
          </div>
          
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
  
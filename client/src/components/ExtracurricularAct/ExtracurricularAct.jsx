import { ChevronRight } from "lucide-react";
import extracurricular1_img from "../../assets/images/Co-Curriculum activity.jpg";
import extracurricular2_img from "../../assets/images/Co-Curriculum Registration activity 1.jpg";
import extracurricular3_img from "../../assets/images/PPKI activity 2.jpg";

export const ExtracurricularActivities = ({ data }) => {
  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
      </div>
    );

    console.log("extracurricular acts: ", data);

  const Cpu = (props) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <rect x="4" y="4" width="16" height="16" rx="2"></rect>
        <rect x="9" y="9" width="6" height="6"></rect>
        <path d="M15 2v2"></path>
        <path d="M15 20v2"></path>
        <path d="M2 15h2"></path>
        <path d="M2 9h2"></path>
        <path d="M20 15h2"></path>
        <path d="M20 9h2"></path>
        <path d="M9 2v2"></path>
        <path d="M9 20v2"></path>
      </svg>
    );
  };

  const Music = (props) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M9 18V5l12-2v13"></path>
        <circle cx="6" cy="18" r="3"></circle>
        <circle cx="18" cy="16" r="3"></circle>
      </svg>
    );
  };

  const Trophy = (props) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
      </svg>
    );
  };

  const activities = [
    {
      id: 1,
      title: data.activities[0].title,
      icon: <Trophy className="text-yellow-500 w-8 h-8" />,
      details: data.activities[0].subtitle,
      image: extracurricular1_img,
    },
    {
      id: 2,
      title: data.activities[1].title,
      icon: <Cpu className="text-yellow-500 w-8 h-8" />,
      details: data.activities[1].subtitle,
      image: extracurricular2_img,
    },
    {
      id: 3,
      title: data.activities[2].title,
      icon: <Music className="text-yellow-500 w-8 h-8" />,
      details: data.activities[2].subtitle,
      image: extracurricular3_img,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900">{data.title}</h2>
          <p className="text-gray-600 mt-2">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-900 p-3.5 rounded-full mr-4">
                    {activity.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900">
                    {activity.title}
                  </h3>
                </div>
                <p className="text-gray-600">{activity.details}</p>
                <div className="mt-6">
                  <a
                    href={`https://web.facebook.com/suriaperdana?mibextid=LQQJ4d&_rdc=1&_rdr`}
                    className="inline-flex items-center text-yellow-600 font-medium hover:text-yellow-700 transition-colors"
                  >
                    Learn More
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://web.facebook.com/suriaperdana?mibextid=LQQJ4d&_rdc=1&_rdr"
            className="inline-flex items-center bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            View All Activities
            <ChevronRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

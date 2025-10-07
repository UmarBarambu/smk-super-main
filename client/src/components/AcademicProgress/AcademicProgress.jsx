import { BookOpen } from "lucide-react";

export const AcademicPrograms = ({ data }) => {
  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
      </div>
    );

  const Palette = (props) => {
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
        <circle cx="13.5" cy="6.5" r="1.5"></circle>
        <circle cx="17.5" cy="10.5" r="1.5"></circle>
        <circle cx="8.5" cy="7.5" r="1.5"></circle>
        <circle cx="6.5" cy="12.5" r="1.5"></circle>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
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

  const Globe = (props) => {
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
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    );
  };

  const programs = [
    {
      id: 1,
      title: data.excellence[0].title,
      description: data.excellence[0].subtitle,
      icon: <BookOpen className="w-8 h-8 text-yellow-500" />,
    },
    {
      id: 2,
      title: data.excellence[1].title,
      description: data.excellence[1].subtitle,
      icon: <Palette className="w-8 h-8 text-yellow-500" />,
    },
    {
      id: 3,
      title: data.excellence[2].title,
      description: data.excellence[2].subtitle,
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
    },
    {
      id: 4,
      title: data.excellence[3].title,
      description: data.excellence[3].subtitle,
      icon: <Globe className="w-8 h-8 text-yellow-500" />,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900">{data.title}</h2>
          <p className="text-gray-600 mt-2">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-900"
            >
              <div className="bg-blue-900 p-3 rounded-full inline-block mb-4">
                {program.icon}
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                {program.title}
              </h3>
              <p className="text-gray-600">{program.description}</p>
              <a
                href={`/programs/${program.id}`}
                className="mt-4 inline-block text-yellow-600 font-medium hover:text-yellow-700"
              >
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

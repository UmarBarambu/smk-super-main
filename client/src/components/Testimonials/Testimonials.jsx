import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

export const Testimonials = ({ data }) => {
  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
      </div>
    );

  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      id: 1,
      quote: data.testimony[0].testimony,
      author: data.testimony[0].name,
      role: data.testimony[0].identity,
      image: "/api/placeholder/100/100",
    },
    {
      id: 2,
      quote: data.testimony[1].testimony,
      author: data.testimony[1].name,
      role: data.testimony[1].identity,
      image: "/api/placeholder/100/100",
    },
    {
      id: 3,
      quote: data.testimony[2].testimony,
      author: data.testimony[2].name,
      role: data.testimony[2].identity,
      image: "/api/placeholder/100/100",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-16 bg-blue-900 text-white border-y border-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">{data.title}</h2>
          <p className="text-blue-100 mt-2">{data.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative h-64 md:h-48">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute w-full transition-opacity duration-500 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="bg-blue-800 p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">
                        {testimonial.author}
                      </h4>
                      <p className="text-yellow-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="italic text-blue-100">"{testimonial.quote}"</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex
                    ? "bg-yellow-400"
                    : "bg-blue-700 hover:bg-blue-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="/testimonials"
            className="inline-flex items-center bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
          >
            Read More Testimonials
            <ChevronRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

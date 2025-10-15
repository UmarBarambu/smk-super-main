import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";

const SchoolMomentsGallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample school moments data - replace with your actual data
  const moments = [
    {
      id: 1,
      image:
        "https://scontent.fkul2-4.fna.fbcdn.net/v/t39.30808-6/487428857_1177759684142954_768391612597203681_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=_KmWOOCtiaYQ7kNvwHFY8Sn&_nc_oc=Adn-xNaFdJ0Z2gSegwpGWDyJ74db0n6_xmnWEdQmsN18lueaIcTocZdWSC7rM9nGADZJG_pwjBzSgp5G3A0gxCjj&_nc_zt=23&_nc_ht=scontent.fkul2-4.fna&_nc_gid=qjHU73l5xv0DIJC-Lm1XrA&oh=00_AfdyPUdYH52LMrn_CoMeU1H6oMDGCUNvtCJyEGJYZkh2bQ&oe=68F514BB",
      title: "Annual Sports Day",
      description:
        "Students showcasing their athletic talents at our annual sports competition",
      date: "March 15, 2024",
      location: "Main Field",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=600&fit=crop",
      title: "Science Fair Exhibition",
      description:
        "Innovative projects and experiments presented by our talented students",
      date: "February 20, 2024",
      location: "Science Lab",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop",
      title: "Cultural Festival",
      description:
        "Celebrating diversity through music, dance, and traditional performances",
      date: "April 10, 2024",
      location: "Main Auditorium",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
      title: "Graduation Ceremony",
      description:
        "Proud moment as our students receive their diplomas and awards",
      date: "May 25, 2024",
      location: "School Hall",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      title: "Library Reading Week",
      description:
        "Encouraging literacy and love for reading among our students",
      date: "January 18, 2024",
      location: "School Library",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % moments.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, moments.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % moments.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + moments.length) % moments.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full  mx-auto bg-white shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-1 w-12 bg-yellow-400 rounded"></div>
            <span className="text-yellow-400 font-medium tracking-wide">
              NEWS
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            School Moments
          </h1>
          <p className="text-blue-100 text-lg">
            Capturing our memorable experiences
          </p>
        </div>
      </div>

      <section className="max-w-6xl mx-auto">
        {/* Main Slider */}
        <div
          className="relative h-96 md:h-[500px] overflow-hidden mt-8"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {moments.map((moment, index) => (
              <div key={moment.id} className="w-full flex-shrink-0 relative">
                <img
                  src={moment.image}
                  alt={moment.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {moment.title}
                  </h3>
                  <p className="text-gray-200 mb-3 text-sm md:text-base">
                    {moment.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{moment.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{moment.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Slide Counter */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
            {currentSlide + 1} / {moments.length}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="p-4 bg-gray-50">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {moments.map((moment, index) => (
              <button
                key={moment.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-20 h-16 md:w-24 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentSlide
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <img
                  src={moment.image}
                  alt={moment.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 p-4 bg-gray-50">
          {moments.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-blue-500 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Auto-play Control */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex justify-center">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isAutoPlaying
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              {isAutoPlaying ? "Pause Slideshow" : "Play Slideshow"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchoolMomentsGallery;

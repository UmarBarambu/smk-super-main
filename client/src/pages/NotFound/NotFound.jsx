import React, { useState, useEffect } from "react";
import { Home, Search, ArrowLeft, Zap, Globe, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <div
      key={i}
      className={`absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-white rounded-full opacity-60 animate-pulse`}
      style={{
        left: `${20 + i * 15}%`,
        top: `${30 + i * 8}%`,
        animationDelay: `${i * 0.5}s`,
        transform: `translate(${mousePosition.x * 0.02}px, ${
          mousePosition.y * 0.02
        }px)`,
        transition: "transform 0.1s ease-out",
      }}
    />
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      {/* Floating elements */}
      {floatingElements}

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div
        className="absolute top-3/4 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div
          className={`max-w-2xl mx-auto text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* 404 Number with glassmorphism effect */}
          <div className="relative mb-8">
            <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-400 animate-pulse select-none">
              404
            </div>
            <div className="absolute inset-0 text-8xl md:text-9xl font-black text-white opacity-10 blur-sm select-none">
              404
            </div>
          </div>

          {/* Main content card */}
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-white rounded-full">
                <Globe
                  className="w-8 h-8 text-white animate-spin"
                  style={{ animationDuration: "3s" }}
                />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Oops! Page Not Found
            </h1>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              The page you're looking for seems to have vanished into the
              digital void. Don't worry though – even the best explorers
              sometimes take a wrong turn.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/" className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-white hover:from-blue-700 hover:to-white text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Go Home
              </Link>

              <Link to="/" className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-white/30">
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Search Site
              </Link>

              <Link to="/" className="group flex items-center gap-3 text-gray-300 hover:text-white px-4 py-4 rounded-full font-medium transition-all duration-300 hover:bg-white/10">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                Go Back
              </Link>
            </div>
          </div>

          {/* Fun stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex justify-center mb-2">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">99.9%</div>
              <div className="text-xs text-gray-400">Uptime</div>
            </div>

            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex justify-center mb-2">
                <Star className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">5.0</div>
              <div className="text-xs text-gray-400">Rating</div>
            </div>

            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex justify-center mb-2">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-xs text-gray-400">Support</div>
            </div>
          </div>

          {/* Footer message */}
          <p className="text-gray-500 text-sm mt-8">
            Error 404 • Page not found • But you found something cooler instead
            ✨
          </p>
        </div>
      </div>
    </div>
  );
}
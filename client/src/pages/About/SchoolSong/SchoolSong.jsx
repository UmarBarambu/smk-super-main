import React, { useState } from 'react';
import { Play, Pause, Volume2, Music } from 'lucide-react';

const SchoolSongComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(true);

  const schoolLyrics = [
    "Bersama-sama Berganding Bersatu",
    "Marilah kita tekad Berusaha",
    "Kita Buktikan Taat dan Setia",
    "Pada Nusa dan Bangsa Yang Tercinta",
    "",
    "Walaupun apa Rintangan Mendatang",
    "Kita Tempuhi Dengan Kesabaran",
    "Teguh Bersemangat Penuh Dedikasi",
    "Berusaha Terus Mengharungi",
    "",
    "Yakinlah Semua",
    "Pohonkanlah Doa",
    "Untuk Kejayaan Masa Hadapan",
    "",
    "Walaupun Apa Rintangan Mendatang",
    "Kita Tempuhi Dengan Kesabaran",
    "Teguh Bersemangat Penuh Dedikasi",
    "Berusaha Terus Mengharungi",
    "Marilah Semua Tanamkanlah Cita",
    "Demi SMK Suria Perdana Berjaya"
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, you would control the YouTube video here
    console.log(isPlaying ? 'Pausing...' : 'Playing...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/20 to-transparent"></div>
        <div className="relative px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <Music className="w-10 h-10 text-blue-800" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Lagu Sekolah
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              SMK Suria Perdana
            </p>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* YouTube Video Section */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Volume2 className="w-6 h-6" />
                  Dengar Lagu Sekolah
                </h2>
              </div>
              
              <div className="p-6">
                {/* YouTube Embed */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/ZWRnZq_cBlU"
                    title="SMK Suria Perdana School Song"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                
                {/* Control Button */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handlePlayPause}
                    className={`flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                      isPlaying
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-6 h-6" />
                        Berhenti
                      </>
                    ) : (
                      <>
                        <Play className="w-6 h-6" />
                        Main
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lyrics Section */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center justify-between">
                  Lirik Lagu Sekolah
                  <button
                    onClick={() => setShowLyrics(!showLyrics)}
                    className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors"
                  >
                    {showLyrics ? 'Sembunyikan' : 'Tunjukkan'}
                  </button>
                </h2>
              </div>
              
              {showLyrics && (
                <div className="p-8">
                  <div className="space-y-4">
                    {schoolLyrics.map((line, index) => (
                      <div key={index} className="group">
                        {line === "" ? (
                          <div className="h-4"></div>
                        ) : (
                          <p className="text-lg text-gray-800 leading-relaxed hover:text-blue-600 transition-colors duration-200 cursor-default py-1">
                            {line}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* School motto */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border-l-4 border-blue-500">
                    <p className="text-center text-lg font-semibold text-blue-800 italic">
                      "Together Towards Excellence"
                    </p>
                    <p className="text-center text-sm text-gray-600 mt-2">
                      Bersatu dalam komitmen kecemerlangan pendidikan
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-green-500 p-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              SMK Suria Perdana
            </h3>
            <p className="text-blue-100 text-lg mb-4">
              Dedicated Educators & Support Personnel
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-100">
              <span className="bg-white/20 px-4 py-2 rounded-full">Academic Year 2024/2025</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Teaching Faculty & Staff</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <button
          onClick={() => setShowLyrics(!showLyrics)}
          className="w-14 h-14 bg-yellow-400 hover:bg-yellow-500 rounded-full shadow-lg flex items-center justify-center transition-colors"
        >
          <Music className="w-6 h-6 text-blue-800" />
        </button>
      </div>
    </div>
  );
};

export default SchoolSongComponent;
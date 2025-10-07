import React, { useState } from 'react';
import { Users, Calendar, MapPin, Phone, Mail, Award, Briefcase, GraduationCap, Heart, ChevronDown, ChevronRight, Star, Trophy, Building, Globe, Clock } from 'lucide-react';

const AlumniPage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedYear, setSelectedYear] = useState('all');
  //const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const alumniStats = [
    { icon: Users, count: '2,847', label: 'Total Alumni', color: 'bg-blue-500' },
    { icon: Building, count: '156', label: 'Different Companies', color: 'bg-green-500' },
    { icon: Award, count: '89', label: 'Awards Won', color: 'bg-yellow-500' },
    { icon: Globe, count: '23', label: 'Countries', color: 'bg-purple-500' }
  ];

  const graduationYears = ['all', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'];

  const featuredAlumni = [
    {
      name: 'Ahmad Rizal bin Hassan',
      year: '2018',
      position: 'Software Engineer',
      company: 'Google Malaysia',
      image: '/api/placeholder/120/120',
      achievement: 'Tech Innovation Award 2023'
    },
    {
      name: 'Siti Sarah binti Abdullah',
      year: '2019',
      position: 'Medical Doctor',
      company: 'Hospital Kuala Lumpur',
      image: '/api/placeholder/120/120',
      achievement: 'Outstanding Young Professional 2024'
    },
    {
      name: 'Lim Wei Ming',
      year: '2017',
      position: 'Entrepreneur',
      company: 'GreenTech Solutions Sdn Bhd',
      image: '/api/placeholder/120/120',
      achievement: 'Young Entrepreneur of the Year 2023'
    },
    {
      name: 'Nurul Aina binti Mohd Yusof',
      year: '2020',
      position: 'Data Scientist',
      company: 'Grab Malaysia',
      image: '/api/placeholder/120/120',
      achievement: 'AI Excellence Award 2024'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Annual Alumni Gathering 2025',
      date: '15 Mac 2025',
      time: '7:00 PM - 11:00 PM',
      location: 'SMK Suria Perdana Hall',
      type: 'Reunion'
    },
    {
      title: 'Career Mentorship Program',
      date: '22 Feb 2025',
      time: '2:00 PM - 5:00 PM',
      location: 'Virtual & Physical',
      type: 'Workshop'
    },
    {
      title: 'Alumni Business Networking',
      date: '8 Apr 2025',
      time: '6:30 PM - 9:00 PM',
      location: 'Kuala Lumpur Convention Centre',
      type: 'Networking'
    }
  ];

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'directory', label: 'Alumni Directory', icon: GraduationCap },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-10 h-10 text-blue-800" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Alumni SMK Suria Perdana</h1>
            <p className="text-xl text-blue-100 mb-8">Connecting Past, Present, and Future</p>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                    activeSection === item.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {alumniStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <div className={`${stat.color} h-2`}></div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold text-gray-800">{stat.count}</p>
                          <p className="text-gray-600 mt-1">{stat.label}</p>
                        </div>
                        <div className={`${stat.color} p-3 rounded-full`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Selamat Datang Alumni!</h2>
              <p className="text-lg leading-relaxed">
                SMK Suria Perdana berbangga dengan pencapaian alumni kami di pelbagai bidang. 
                Kami komited untuk terus mengekalkan hubungan dan menyokong perjalanan kerjaya anda. 
                Sertai komuniti alumni kami untuk peluang networking, mentorship, dan pembangunan profesional.
              </p>
            </div>

            {/* Featured Alumni */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Alumni Terpilih</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredAlumni.map((alumni, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6 text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">{alumni.name.charAt(0)}</span>
                      </div>
                      <h3 className="font-bold text-gray-800 mb-1">{alumni.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">Batch {alumni.year}</p>
                      <p className="text-sm font-medium text-blue-600 mb-1">{alumni.position}</p>
                      <p className="text-sm text-gray-500 mb-3">{alumni.company}</p>
                      <div className="bg-yellow-50 p-2 rounded-lg">
                        <div className="flex items-center justify-center gap-1 text-yellow-600">
                          <Star className="w-4 h-4" />
                          <span className="text-xs font-medium">{alumni.achievement}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Directory Section */}
        {activeSection === 'directory' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Direktori Alumni</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">Semua Tahun</option>
                    {graduationYears.slice(1).map(year => (
                      <option key={year} value={year}>Batch {year}</option>
                    ))}
                  </select>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Cari Alumni
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredAlumni.map((alumni, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{alumni.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{alumni.name}</h3>
                        <p className="text-sm text-gray-600">Batch {alumni.year}</p>
                        <p className="text-sm text-blue-600">{alumni.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Events Section */}
        {activeSection === 'events' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Acara Akan Datang</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            event.type === 'Reunion' ? 'bg-blue-100 text-blue-800' :
                            event.type === 'Workshop' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {event.type}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Daftar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Achievements Section */}
        {activeSection === 'achievements' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Pencapaian Alumni</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Anugerah & Pengiktirafan</h3>
                  {featuredAlumni.map((alumni, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
                      <Trophy className="w-6 h-6 text-yellow-600" />
                      <div>
                        <p className="font-medium text-gray-800">{alumni.name}</p>
                        <p className="text-sm text-gray-600">{alumni.achievement}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Bidang Kerjaya</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Briefcase className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="font-semibold text-gray-800">Teknologi</p>
                      <p className="text-sm text-gray-600">35%</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Heart className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="font-semibold text-gray-800">Kesihatan</p>
                      <p className="text-sm text-gray-600">20%</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Building className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="font-semibold text-gray-800">Perniagaan</p>
                      <p className="text-sm text-gray-600">25%</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <GraduationCap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <p className="font-semibold text-gray-800">Pendidikan</p>
                      <p className="text-sm text-gray-600">20%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AlumniPage;

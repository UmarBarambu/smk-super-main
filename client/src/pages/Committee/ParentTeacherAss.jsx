import React, { useState, useEffect } from "react";
import {
  Users,
  Heart,
  Calendar,
  MessageCircle,
  BookOpen,
  Award,
  Phone,
  Mail,
  MapPin,
  Clock,
  Target,
  Handshake,
} from "lucide-react";

import pta_img1 from "../../assets/images/committee/food after the PIBG meeting.jpg";
import pta_img2 from "../../assets/images/committee/PIBG 1.jpg";
import pta_img3 from "../../assets/images/committee/PIBG 2.jpg";
import pta_img4 from "../../assets/images/committee/PIBG.jpg";
import pta_img5 from "../../assets/images/committee/Sabrina, alumni pelajar SuPer memberi sumbangan makanan..jpg";


const PTAPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const ptaImages = [
    {
      id: 1,
      src: pta_img1,
      title: "PTA Committee Meeting",
      description:
        "Monthly meetings to discuss school policies and student welfare",
      category: "Meetings",
    },
    {
      id: 2,
      src: pta_img2,
      title: "School Event Collaboration",
      description:
        "Parents and teachers working together to organize school events",
      category: "Events",
    },
    {
      id: 3,
      src: pta_img3,
      title: "Parent-Teacher Conference",
      description:
        "Individual discussions about student progress and development",
      category: "Conferences",
    },
    {
      id: 4,
      src: pta_img4,
      title: "Educational Workshops",
      description:
        "Training sessions for parents on supporting children's education",
      category: "Workshops",
    },
    {
      id: 5,
      src: pta_img5,
      title: "Volunteer Activities",
      description: "Parents volunteering in school activities and programs",
      category: "Volunteering",
    },
  ];

  const ptaActivities = [
    {
      icon: Calendar,
      title: "Regular Meetings",
      description:
        "Monthly meetings to discuss school matters, student welfare, and community initiatives",
    },
    {
      icon: MessageCircle,
      title: "Communication Bridge",
      description:
        "Facilitating effective communication between parents, teachers, and school administration",
    },
    {
      icon: Heart,
      title: "Student Welfare",
      description:
        "Advocating for student needs and ensuring their well-being in all school activities",
    },
    {
      icon: Award,
      title: "Academic Support",
      description:
        "Supporting academic programs and initiatives to enhance student learning outcomes",
    },
    {
      icon: Handshake,
      title: "Community Building",
      description:
        "Strengthening the school community through collaborative efforts and shared goals",
    },
    {
      icon: Target,
      title: "School Development",
      description:
        "Contributing to school improvement projects and infrastructure development",
    },
  ];

  const tabs = [
    { id: "about", label: "About PTA", icon: Users },
    { id: "activities", label: "Activities", icon: Calendar },
    { id: "membership", label: "Membership", icon: Heart },
    { id: "contact", label: "Contact", icon: Phone },
  ];

  const renderAbout = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">What is PTA?</h3>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The Parent-Teacher Association (PTA) is a collaborative organization
          that brings together parents, teachers, and school staff to work
          towards the common goal of enhancing the educational experience and
          well-being of our students. Our PTA serves as a vital bridge between
          home and school, fostering strong partnerships that benefit the entire
          school community.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h4 className="text-xl font-semibold text-blue-800 mb-3">
              Our Purpose
            </h4>
            <p className="text-gray-700">
              To promote the welfare of children and youth in home, school, and
              community environments while supporting and speaking on behalf of
              children in schools.
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h4 className="text-xl font-semibold text-green-800 mb-3">
              Our Mission
            </h4>
            <p className="text-gray-700">
              To enhance the educational experience through parent
              participation, advocacy, and support for our students, teachers,
              and school programs.
            </p>
          </div>
        </div>
      </div>

    </div>
  );

  const renderActivities = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          PTA Activities & Programs
        </h3>
        <p className="text-xl text-gray-600">
          Our diverse range of activities supports student success and community
          building
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ptaActivities.map((activity, index) => {
          const IconComponent = activity.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow group"
            >
              <div className="text-center space-y-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800">
                  {activity.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
        <h3 className="text-2xl font-bold text-blue-800 mb-6">Annual Events</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-blue-200">
              <Calendar className="w-6 h-6 text-blue-600" />
              <div>
                <h4 className="font-semibold text-gray-800">Family Fun Day</h4>
                <p className="text-gray-600 text-sm">
                  Annual school carnival with games and activities
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-blue-200">
              <Award className="w-6 h-6 text-blue-600" />
              <div>
                <h4 className="font-semibold text-gray-800">
                  Academic Awards Night
                </h4>
                <p className="text-gray-600 text-sm">
                  Celebrating student achievements and excellence
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-blue-200">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <div>
                <h4 className="font-semibold text-gray-800">Book Fair</h4>
                <p className="text-gray-600 text-sm">
                  Promoting literacy and reading culture
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-blue-200">
              <Heart className="w-6 h-6 text-blue-600" />
              <div>
                <h4 className="font-semibold text-gray-800">
                  Community Service Projects
                </h4>
                <p className="text-gray-600 text-sm">
                  Giving back to the local community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMembership = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Become a PTA Member
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          Joining our PTA is easy and rewarding! Every parent, teacher, and
          school staff member is welcome to participate in our mission to
          support student success.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Membership Benefits
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Voice in school decisions</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">
                  Access to exclusive events
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Networking opportunities</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">
                  Regular updates on school activities
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">
                  Opportunity to make a difference
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              How to Join
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <span className="text-gray-700">
                  Complete the membership form
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <span className="text-gray-700">Pay annual membership fee</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <span className="text-gray-700">Attend monthly meetings</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <span className="text-gray-700">
                  Start making a difference!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
        <h3 className="text-2xl font-bold text-green-800 mb-6">
          Meeting Schedule
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-green-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Regular Meetings
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">
                  First Tuesday of each month
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">7:00 PM - 8:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">School Conference Room</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-green-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Special Events
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Annual General Meeting</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Quarterly Social Events</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">
                  Parent-Teacher Conferences
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h3>
        <p className="text-lg text-gray-700 mb-8">
          Have questions about PTA? Want to get involved? We'd love to hear from
          you!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              PTA Executive Committee
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-semibold text-blue-800">President</h5>
                <p className="text-gray-700">Mrs. Sarah Johnson</p>
                <div className="flex items-center gap-2 mt-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600">
                    president@pta-school.edu
                  </span>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h5 className="font-semibold text-green-800">Vice President</h5>
                <p className="text-gray-700">Mr. David Chen</p>
                <div className="flex items-center gap-2 mt-2">
                  <Mail className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">
                    vicepresident@pta-school.edu
                  </span>
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h5 className="font-semibold text-purple-800">Secretary</h5>
                <p className="text-gray-700">Mrs. Maria Rodriguez</p>
                <div className="flex items-center gap-2 mt-2">
                  <Mail className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-600">
                    secretary@pta-school.edu
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Contact Information
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Phone className="w-6 h-6 text-blue-600" />
                <div>
                  <h5 className="font-semibold text-gray-800">Phone</h5>
                  <p className="text-gray-600">+60 3-1234 5678</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="w-6 h-6 text-blue-600" />
                <div>
                  <h5 className="font-semibold text-gray-800">Email</h5>
                  <p className="text-gray-600">pta@smksuriaperdana.edu.my</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600" />
                <div>
                  <h5 className="font-semibold text-gray-800">Location</h5>
                  <p className="text-gray-600">School Main Office</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return renderAbout();
      case "activities":
        return renderActivities();
      case "membership":
        return renderMembership();
      case "contact":
        return renderContact();
      default:
        return renderAbout();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-1 w-12 bg-yellow-400 rounded"></div>
            <span className="text-yellow-400 font-medium tracking-wide">
              COMMITTEE
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Parent-Teacher Association
          </h1>
          <p className="text-blue-100 text-lg">
            Building bridges between home and school for our children's success
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-fadeIn">{renderTabContent()}</div>
      </div>

      {/* Image Gallery */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                PTA in Action
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how our PTA members actively participate in school life and
                student development
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ptaImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`group transform transition-all duration-500 delay-${
                    index * 100
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {image.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        {image.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default PTAPage;

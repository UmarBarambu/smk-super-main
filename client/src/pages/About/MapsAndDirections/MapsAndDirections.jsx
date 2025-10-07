// 

import React from "react";
import { MapPin, Phone, Mail, Clock, Bus, Car, Navigation } from "lucide-react";

const MapsAndDirections = () => {
  return (
    <section className="bg-white font-sans">
      {/* Hero Banner */}
      <div className=" text-blue-950">
        <div className="max-w-6xl mx-auto py-10 px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Visit Our Campus</h1>
          <p className="text-gray-500 text-lg">Find your way to SMK Suria Perdana with ease</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        {/* Map and Contact Info Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Map - Takes up 2/3 on medium screens and up */}
          <div className="md:col-span-2 rounded-lg overflow-hidden shadow-lg h-[400px] md:h-[450px]">
            <iframe
              title="Google Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.6639625907937!2d103.15129370000001!3d1.8829532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d05dbdfb75fd35%3A0xbbdee4bd03370125!2sSMK%20Suria%20Perdana!5e0!3m2!1sen!2suk!4v1743985834575!5m2!1sen!2suk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Information Card - Takes up 1/3 on medium screens and up */}
          <div className="bg-gray-50 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">School Address</h3>
                  <p className="text-gray-600 mt-1">
                    Jalan Parit Semarang,<br />
                    86400 Parit Raja,<br />
                    Johor Darul Ta'zim, Malaysia
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="text-blue-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Telephone</h3>
                  <p className="text-gray-600 mt-1">07-4541866, Faks:  07-4541867 </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="text-blue-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600 mt-1"> jea0025@moe.edu.my</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="text-blue-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">School Hours</h3>
                  <p className="text-gray-600 mt-1">
                    Monday - Friday: 7:30 AM - 2:30 PM<br />
                    Office Hours: 8:00 AM - 4:30 PM
                  </p>
                </div>
              </div>
            </div>
            
            <a 
              href="https://www.google.com/maps/dir//SMK+Suria+Perdana/@1.8829532,103.1512937,16z/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 bg-blue-600 text-white py-3 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Navigation size={18} />
              Get Directions
            </a>
          </div>
        </div>

        {/* Transportation Options */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Reach Us</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* By Bus */}
            <div className="bg-gray-50 p-6 rounded-lg shadow border-l-4 border-blue-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Bus className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">By Public Transport</h3>
              </div>
              <p className="text-gray-600">
                Take bus routes 102, 204, or 308 from Batu Pahat central station. The school is located near the Parit Raja community center, approximately a 5-minute walk from the bus stop.
              </p>
            </div>
            
            {/* By Car */}
            <div className="bg-gray-50 p-6 rounded-lg shadow border-l-4 border-blue-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Car className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">By Car</h3>
              </div>
              <p className="text-gray-600">
                From Batu Pahat city center, take the main highway heading east toward Parit Raja. Turn right at the traffic light near UTHM and continue for 1.5 km. The school will be on your left, with ample parking available on campus.
              </p>
            </div>
          </div>
        </div>

        {/* Campus Gallery */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Campus Gallery</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img src="/api/placeholder/600/600" alt="School Main Building" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img src="/api/placeholder/600/600" alt="School Entrance" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img src="/api/placeholder/600/600" alt="Library" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img src="/api/placeholder/600/600" alt="Sports Field" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img src="/api/placeholder/600/600" alt="Science Lab" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img src="/api/placeholder/600/600" alt="Cafeteria" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-6 bg-white">
              <h3 className="font-semibold text-lg text-gray-800">Is there parking available for visitors?</h3>
              <p className="mt-2 text-gray-600">Yes, visitor parking is available at the front of the main building. Please register at the security booth upon arrival.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 bg-white">
              <h3 className="font-semibold text-lg text-gray-800">What are the best times to visit the school?</h3>
              <p className="mt-2 text-gray-600">We recommend visiting during regular school hours (7:30 AM - 2:30 PM) to see the campus in action. For admission inquiries, please visit during office hours from 8:00 AM - 4:30 PM.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 bg-white">
              <h3 className="font-semibold text-lg text-gray-800">Do you offer campus tours?</h3>
              <p className="mt-2 text-gray-600">Yes, we offer guided tours every Tuesday and Thursday. Please contact our office to schedule a visit at least 48 hours in advance.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapsAndDirections;
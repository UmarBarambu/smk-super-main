import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

import logo from "../../assets/images/logo.png";

export const Footer = ({ data }) => {
  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
      </div>
    );
  return (
    <footer className="bg-blue-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <img src={logo} alt="smk logo" width={50} />
            </div>
            <p className="text-blue-100 mb-4">{data.contact.motto}</p>
            <div className="flex space-x-4">
              <a
                href="https://web.facebook.com/suriaperdana?mibextid=LQQJ4d&_rdc=1&_rdr"
                className="text-white hover:text-yellow-400 transition-colors"
              >
                <FaFacebook className="text-3xl" />{" "}
              </a>
              <a
                href="https://www.tiktok.com/@smksuriaperdana?_t=ZN-8wTA2YQOEqc&_r=1"
                className="text-white hover:text-yellow-400 transition-colors"
              >
                <FaTiktok className="text-3xl" />
              </a>
              <a
                href="https://www.instagram.com/smksuriaperdana/"
                className="text-white hover:text-yellow-400 transition-colors"
              >
                <FaInstagramSquare className="text-3xl" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/about-us"
                  className="text-blue-100 hover:text-yellow-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/admissions"
                  className="text-blue-100 hover:text-yellow-400 transition-colors"
                >
                  Admissions
                </a>
              </li>
              <li>
                <a
                  href="/academics"
                  className="text-blue-100 hover:text-yellow-400 transition-colors"
                >
                  Academics
                </a>
              </li>
              <li>
                <a
                  href="/calendar"
                  className="text-blue-100 hover:text-yellow-400 transition-colors"
                >
                  School Calendar
                </a>
              </li>
              <li>
                <a
                  href="/news"
                  className="text-blue-100 hover:text-yellow-400 transition-colors"
                >
                  News & Events
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-blue-100">{data.contact.contact[0]}</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                <a
                  href="tel:+11234567890"
                  className="text-blue-100 hover:text-yellow-400 transition-colors"
                >
                  {data.contact.contact[1]}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                <a
                  href="mailto:info@excellenceacademy.edu"
                  className="text-blue-100 hover:text-yellow-400 transition-colors"
                >
                  {data.contact.contact[2]}
                </a>
              </li>
              <li className="flex items-center">
                <Clock className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                <span className="text-blue-100">
                  {data.contact.contact[3]}{" "}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} SMK SURIA PERDANA. All rights
              reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="/privacy-policy"
                className="text-blue-200 hover:text-yellow-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-blue-200 hover:text-yellow-400 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/sitemap"
                className="text-blue-200 hover:text-yellow-400 transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

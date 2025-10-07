// import { useState } from 'react';
// import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
// import { Link, useLocation } from 'react-router-dom';
// import logo from "../../assets/images/logo.png";

// // Header Component
// export const Header = ({ navItems }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [hoveredItem, setHoveredItem] = useState(null);
//   const location = useLocation();

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   // Helper to check if a nav or its subnav is active
//   const isNavActive = (item) => {
//     if (location.pathname === item.path) return true;
//     if (item.subNavs && item.subNavs.some(sub => location.pathname === sub.path)) return true;
//     return false;
//   };
//   const isSubNavActive = (subNav) => location.pathname === subNav.path;

//   return (
//     <header className="sticky top-0 bg-blue-900 text-white shadow-md z-[60]">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center py-4">
//           <Link to="/" className="flex items-center space-x-4">
//             <div className="flex items-center">
//               <img src={logo} alt="smk logo" className="w-[60px] md:w-[80px]" />
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center space-x-6">
//             {navItems.map((item) => (
//               <div
//                 key={item.key}
//                 className="relative group"
//                 onMouseEnter={() => setHoveredItem(item.key)}
//                 onMouseLeave={() => setHoveredItem(null)}
//               >
//                 <Link
//                   to={item.path}
//                   className={`font-medium transition-colors flex items-center px-2 py-1 rounded-md ${
//                     isNavActive(item)
//                       ? 'bg-yellow-400 text-blue-900' // highlighted
//                       : 'hover:text-yellow-400'
//                   }`}
//                 >
//                   {item.key}
//                   {item.subNavs && item.subNavs.length > 0 && (
//                     <ChevronDown className="ml-1 w-4 h-4" />
//                   )}
//                 </Link>

//                 {/* Dropdown Menu */}
//                 {item.subNavs && item.subNavs.length > 0 && hoveredItem === item.key && (
//                   <div className="absolute left-0 mt-0 bg-white w-64 rounded-md shadow-lg py-1 z-50">
//                     {item.subNavs.map((subNav) => (
//                       <Link
//                         key={subNav.key}
//                         to={subNav.path}
//                         className={`block px-4 py-2 text-sm rounded-md transition-colors ${
//                           isSubNavActive(subNav)
//                             ? 'bg-yellow-400 text-blue-900 font-semibold'
//                             : 'text-blue-900 hover:bg-yellow-100 hover:text-blue-800'
//                         }`}
//                       >
//                         {subNav.key}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* Mobile Navigation Toggle Button */}
//           <div className="lg:hidden">
//             <button onClick={toggleMenu} className="text-white focus:outline-none">
//               {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation Menu */}
//       {isOpen && (
//         <div className="lg:hidden bg-blue-800 fixed inset-0 z-50 overflow-y-auto mt-[90px]">
//           <div className="px-2 pt-2 pb-3 space-y-1 min-h-screen">
//             {navItems.map((item) => (
//               <div key={item.key}>
//                 <Link
//                   to={item.path}
//                   className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
//                     isNavActive(item)
//                       ? 'bg-yellow-400 text-blue-900'
//                       : 'text-white hover:bg-blue-700'
//                   }`}
//                   onClick={() => setIsOpen(false)}
//                 >
//                   <div className="flex justify-between items-center">
//                     <span>{item.key}</span>
//                     {item.subNavs && item.subNavs.length > 0 && (
//                       <ChevronRight className="w-5 h-5" />
//                     )}
//                   </div>
//                 </Link>
//                 {item.subNavs && item.subNavs.length > 0 && (
//                   <div className="pl-4">
//                     {item.subNavs.map((subNav) => (
//                       <Link
//                         key={subNav.key}
//                         to={subNav.path}
//                         className={`block px-3 py-2 text-sm rounded-md transition-colors ${
//                           isSubNavActive(subNav)
//                             ? 'bg-yellow-400 text-blue-900 font-semibold'
//                             : 'text-gray-200 hover:bg-blue-700'
//                         }`}
//                         onClick={() => setIsOpen(false)}
//                       >
//                         {subNav.key}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

import { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/images/logo.png";
import GoogleTranslate from "../GoogleTranslate"; // 🔹 import the component

// Header Component
export const Header = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isNavActive = (item) => {
    if (location.pathname === item.path) return true;
    if (item.subNavs && item.subNavs.some(sub => location.pathname === sub.path)) return true;
    return false;
  };
  const isSubNavActive = (subNav) => location.pathname === subNav.path;

  return (
    <header className="sticky top-0 bg-blue-900 text-white shadow-md z-[60]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Left Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <div className="flex items-center">
              <img src={logo} alt="smk logo" className="w-[60px] md:w-[80px]" />
            </div>
          </Link>

          {/* Desktop Navigation + Translator */}
          <div className="hidden lg:flex items-center space-x-6 ml-auto">
            <nav className="flex items-center space-x-6">
              {navItems.map((item) => (
                <div
                  key={item.key}
                  className="relative group"
                  onMouseEnter={() => setHoveredItem(item.key)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    to={item.path}
                    className={`font-medium transition-colors flex items-center px-2 py-1 rounded-md ${
                      isNavActive(item)
                        ? 'bg-yellow-400 text-blue-900'
                        : 'hover:text-yellow-400'
                    }`}
                  >
                    {item.key}
                    {item.subNavs && item.subNavs.length > 0 && (
                      <ChevronDown className="ml-1 w-4 h-4" />
                    )}
                  </Link>

                  {item.subNavs && item.subNavs.length > 0 && hoveredItem === item.key && (
                    <div className="absolute left-0 mt-0 bg-white w-64 rounded-md shadow-lg py-1 z-50">
                      {item.subNavs.map((subNav) => (
                        <Link
                          key={subNav.key}
                          to={subNav.path}
                          className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                            isSubNavActive(subNav)
                              ? 'bg-yellow-400 text-blue-900 font-semibold'
                              : 'text-blue-900 hover:bg-yellow-100 hover:text-blue-800'
                          }`}
                        >
                          {subNav.key}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* 🔹 Right side Google Translate */}
            <div className="ml-6">
              <GoogleTranslate />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (unchanged) */}
      {isOpen && (
        <div className="lg:hidden bg-blue-800 fixed inset-0 z-50 overflow-y-auto mt-[90px]">
          <div className="px-2 pt-2 pb-3 space-y-1 min-h-screen">
            {navItems.map((item) => (
              <div key={item.key}>
                <Link
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    isNavActive(item)
                      ? 'bg-yellow-400 text-blue-900'
                      : 'text-white hover:bg-blue-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex justify-between items-center">
                    <span>{item.key}</span>
                    {item.subNavs && item.subNavs.length > 0 && (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </div>
                </Link>
                {item.subNavs && item.subNavs.length > 0 && (
                  <div className="pl-4">
                    {item.subNavs.map((subNav) => (
                      <Link
                        key={subNav.key}
                        to={subNav.path}
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                          isSubNavActive(subNav)
                            ? 'bg-yellow-400 text-blue-900 font-semibold'
                            : 'text-gray-200 hover:bg-blue-700'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {subNav.key}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

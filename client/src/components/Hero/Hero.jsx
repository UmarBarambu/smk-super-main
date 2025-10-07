// import React from "react";
// import { FaBook, FaLightbulb, FaUsers, FaTools } from "react-icons/fa";
// import logo from "../../assets/images/logo.png";
// import { useTranslation } from "react-i18next";

// const Hero = () => {
//   const { t } = useTranslation();

//   return (
//     <section className="bg-gradient-to-r from-[#00247D] to-[#003891] min-h-[60vh] flex items-center justify-center mt-[5rem]">
//       <div className="max-w-[1440px] py-10 px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

//         {/* Left Column - School Logo */}
//         <div className="flex justify-center md:justify-start">
//           <img src={logo} alt="School Logo" className="w-48 md:w-60 lg:w-72 drop-shadow-lg" />
//         </div>

//         {/* Right Column */}
//         <div className="md:col-span-2 space-y-10">

//           {/* Top Row - Icons with Titles */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
//             {[
//               { icon: <FaBook />, title: t("knowledge") },
//               { icon: <FaLightbulb />, title: t("innovation") },
//               { icon: <FaUsers />, title: t("self_belief") },
//               { icon: <FaTools />, title: t("hardwork") },
//             ].map((item, index) => (
//               <div key={index} className="flex flex-col items-center group">
//                 <div className="text-[#FFD700] text-4xl md:text-5xl transition-transform transform group-hover:scale-110">
//                   {item.icon}
//                 </div>
//                 <p className="mt-2 text-lg font-semibold text-white">{item.title}</p>
//               </div>
//             ))}
//           </div>

//           {/* Bottom Row - School Description */}
//           <div className="text-center md:text-left space-y-4">
//             <p className="text-base md:text-xl text-gray-300 leading-relaxed">
//               <span className="font-bold text-gray-200">{t("school_description")}</span>
//               {/* <span className="font-bold text-gray-200"> {t("school_motto")}</span> */}
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import React from "react";

const Hero = ({ data }) => {
  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
      </div>
    );

  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {/* {heroSection.title} */}
            {data.title}
            <span className="bg-gradient-to-r from-yellow-400 via-white to-blue-500 bg-clip-text text-transparent animate-pulse drop-shadow-lg tracking-widest">
              SMK SURIA PERDANA
            </span>
          </h1>
          <p className="text-base md:text-xl mb-10 max-w-3xl">
            {/* {heroSection.subText} */}
            {data.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#"
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-6 py-3 rounded-lg shadow-lg transition-all transform hover:-translate-y-1"
            >
              Apply Now
            </a>
            <a
              href="#"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all transform hover:-translate-y-1"
            >
              Virtual Tour
            </a>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="h-16 w-full text-white fill-current"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,140.83,94.17,208.18,82.17,301.49,65.22,396.36,81.43,461.3,76.48,710.53,64.1,860.08-14,937.19,52.49c28,24.24,50.64,71.28,54.73,116.64"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;

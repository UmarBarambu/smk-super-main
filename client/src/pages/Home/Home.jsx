import React from "react";

import Hero from "../../components/Hero/Hero";
import { MarqueeText } from "../../components/MarqueeText/MarqueeText";
import { ExtracurricularActivities } from "../../components/ExtracurricularAct/ExtracurricularAct";
import { SchoolStats } from "../../components/SchoolStats/SchoolStats";
import { SocialFeeds } from "../../components/SocialFeeds/SocialFeeds";
import { Testimonials } from "../../components/Testimonials/Testimonials";
import { AcademicPrograms } from "../../components/AcademicProgress/AcademicProgress";
import { CallToAction } from "../../components/CallToAction/CallToAction";
import { Footer } from "../../components/Footer/Footer";

const AppStyles = () => {
  return (
    <style jsx global>{`
      @keyframes marquee {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-100%);
        }
      }

      @keyframes marquee2 {
        0% {
          transform: translateX(100%);
        }
        100% {
          transform: translateX(0);
        }
      }

      .animate-marquee {
        animation: marquee 30s linear infinite;
      }

      .animate-marquee2 {
        animation: marquee2 30s linear infinite;
      }
    `}</style>
  );
};

const Home = () => {
  <div className="min-h-screen flex flex-col">
    <AppStyles />
    <Hero />
    <MarqueeText />
    <main className="flex-grow">
      <ExtracurricularActivities />
      <SchoolStats />
      <SocialFeeds />
      <AcademicPrograms />
      <Testimonials />
      <CallToAction />
    </main>
    <Footer />
  </div>;
};

export default Home;

import "./App.css";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Hero from "./components/Hero/Hero";
import About from "./pages/About/About";
import { Header } from "./components/Header/Header";
import MapsAndDirections from "./pages/About/MapsAndDirections/MapsAndDirections";
import SchoolHistory from "./pages/About/SchoolHistory/SchoolHistory";
import TeachersAndStaffs from "./pages/Administration/TeachersAndStaffs/TeachersAndStaffs";
import VisionMission from "./pages/About/VissionMission/VissionMission";
import PtaPayment from "./pages/PtaPayment/PtaPayment";
import { MarqueeText } from "./components/MarqueeText/MarqueeText";
import { ExtracurricularActivities } from "./components/ExtracurricularAct/ExtracurricularAct";
import { SchoolStats } from "./components/SchoolStats/SchoolStats";
import { SocialFeeds } from "./components/SocialFeeds/SocialFeeds";
import { AcademicPrograms } from "./components/AcademicProgress/AcademicProgress";
import { Testimonials } from "./components/Testimonials/Testimonials";
// import { CallToAction } from "./components/CallToAction/CallToAction";
import { Footer } from "./components/Footer/Footer";
import RoomBookingSystem from "./pages/RoomBooking/RoomBooking";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import { UpcomingEvents } from "./pages/Home/UpcommingEvent/UpcomingEvents";
import AnnouncementSection from "./pages/Home/LatestAnnouncement/LatestAnnouncement";
import SchoolSlideshow from "./components/Home/ImageSlides/ImageSlides";
import SchoolHighlights from "./pages/News/SchoolHighlights/SchoolHighlights";
import ProgramDocumentation from "./pages/News/ProgramDoc/ProgramDoc";
import OrganizationalChart from "./pages/About/SchoolOrgChart/SchoolOrgChart";
import NationalEducationPhilosophy from "./pages/About/NationalEduPhi/NationalEduPhi";
import SchoolShop from "./pages/SchoolShop/SchoolShop";
import PrincipalPage from "./pages/Administration/Principal/Principal";
import SchoolManagementPage from "./pages/Administration/SchoolManagement/SchoolManagement";
import StudentAffairsPage from "./pages/Administration/StudentAffairs/StudentAffairs";
import CoCurriculumPage from "./pages/Administration/Co-CurriculumManagement/Co-CurriculumManagement";
import CurriculumManagementPage from "./pages/CurriculumManagement/CurriculumManagement";
import SEIPManagement from "./pages/SpecialEduIntegration/SpecialEduIntegration";
import { fetchHomepage, fetchLatestAnnouncementPage } from "./utils/api";
import Checkout from "./pages/SchoolShop/Checkout";
import CartProvider from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import SchoolSongComponent from "./pages/About/SchoolSong/SchoolSong";
import AlumniPage from "./pages/About/Alumi/Alumi";
import NotFound from "./pages/NotFound/NotFound";
import SchoolMomentsGallery from "./pages/News/Galeri-Moments/GaleriMoments";
import SchoolIdentityPage from "./pages/About/SchoolIdentity/SchoolIdentity";
import PTAPage from "./pages/Committee/ParentTeacherAss";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import SchoolAchievements from "./pages/Achievements/Achievements";
import MyOrders from "./pages/SchoolShop/Myorders";


function App() {
  const [homeData, setHomeData] = useState(null);
  const [latestAnnouncementData, setLatestAnnouncementData] = useState(null);

  useEffect(() => {
    fetchHomepage().then(setHomeData);
    fetchLatestAnnouncementPage().then(setLatestAnnouncementData);
  }, []);

  if (!homeData)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
      </div>
    );

  // console.log(homeData.Sections[8].contact.contact);
  // console.log(latestAnnouncementData);

  const navItems = [
    {
      key: "Home",
      path: "/",
      subNavs: [
        { key: "Latest Announcements", path: "/latest-announcement" },
        { key: "Upcoming Events", path: "/upcoming-events" },
      ],
    },
    {
      key: "About Us",
      path: "/about-us/school-history",
      subNavs: [
        { key: "School History", path: "/about-us/school-history" },
        {
          key: "School Organizational Chart",
          path: "/about-us/school-organizational-chart",
        },
        {
          key: "National Education Philosophy",
          path: "/about-us/national-education-philosophy",
        },
        { key: "School Identity", path: "/about-us/school-identity" },
        { key: "School Song", path: "/about-us/school-song" },
        { key: "Vision & Mission", path: "/about-us/vision&mission" },
      ],
    },
    {
      key: "News",
      path: "/news/galeri-moment",
      subNavs: [
        { key: "Galeri/Moment", path: "/news/galeri-moment" },
        { key: "School Highlights", path: "/news/school-highlights" },
        { key: "Program Documentation", path: "/news/program-documentation" },
      ],
    },
    {
      key: "Administration",
      path: "/administration/principal",
      subNavs: [
        { key: "Principal", path: "/administration/principal" },
        { key: "School Management", path: "/administration/school-management" },
        {
          key: "Teachers & Staff Directory",
          path: "/administration/teachers&staff-directory",
        },
        {
          key: "Student Affairs Unit",
          path: "/administration/student-affairs-unit",
        },
        {
          key: "Curriculum Management",
          path: "/administration/curriculum-management",
        },
        {
          key: "Co-Curriculum Management",
          path: "/administration/co-curriculum-management",
        },
        {
          key: "Special Education Integration Program (SEIP) Management",
          path: "/administration/special-education-integration-program-manaagement",
        },
      ],
    },
    { key: "School Shop", path: "/school-shop" },
    {
      key: "Committee",
      path: "/committee/parent-teacher-association",
      subNavs: [
        {
          key: "Parent-Teacher Association (PTA)",
          path: "/committee/parent-teacher-association",
        },
        { key: "PTA Payments", path: "/committee/pta-payments" },
        {
          key: "Room Booking",
          path: "/committee/room-booking-system",
        },
        {
          key: "Alumni",
          path: "/committee/alumni",
        },
      ],
    },
    { key: "Achievements", path: "/achievements" },
    {
      key: "Contact Us",
      path: "/contact-us/school-location",
    },
  ];
  return (
    <AuthProvider>
      <CartProvider>
        <section>
          <Toaster position="top-right" reverseOrder={false} />

          <Header navItems={navItems} />
          <Routes>
            {/* TEST ROUTES */}
            <Route
              path="/committee/room-booking-system"
              element={<RoomBookingSystem />}
            />
            <Route path="/school-shop" element={<SchoolShop />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-orders" element={<MyOrders />} />


            {/* Main Navigation Routes */}
            <Route
              path="/"
              element={
                <div>
                  <Hero data={homeData.Sections[0]} />
                  <MarqueeText data={homeData.Sections[1].trending} />
                  <SchoolSlideshow data={homeData.Sections[2]} />
                  <main className="flex-grow">
                    <ExtracurricularActivities data={homeData.Sections[3]} />
                    <SchoolStats data={homeData.Sections[4]} />
                    <SocialFeeds data={homeData.Sections[5]} />
                    <AcademicPrograms data={homeData.Sections[6]} />
                    <Testimonials data={homeData.Sections[7]} />
                  </main>
                  <Footer data={homeData.Sections[8]} />
                </div>
              }
            />
            <Route
              path="/latest-announcement"
              element={<AnnouncementSection data={latestAnnouncementData} />}
            />
            <Route path="/upcoming-events" element={<UpcomingEvents />} />
            <Route path="/about-us" element={<About />} />

            <Route
              path="/contact-us"
              element={<div className="mt-30 ml-4">Contact Us Page</div>}
            />

            {/* Sub-navigation Routes */}
            {/* Home SubNavs */}
            <Route
              path="/latest-announcement"
              element={
                <div className="mt-30 ml-4">Latest Announcements Page</div>
              }
            />
            <Route
              path="/upcoming-events"
              element={<div className="mt-30 ml-4">Upcoming Events Page</div>}
            />

            {/* About Us SubNavs */}
            <Route
              path="/about-us/school-history"
              element={<SchoolHistory />}
            />
            <Route
              path="/about-us/school-organizational-chart"
              element={<OrganizationalChart />}
            />
            <Route
              path="/about-us/national-education-philosophy"
              element={<NationalEducationPhilosophy />}
            />
            <Route
              path="/about-us/school-identity"
              element={<SchoolIdentityPage />}
            />
            <Route
              path="/about-us/school-song"
              element={<SchoolSongComponent />}
            />
            <Route
              path="/about-us/vision&mission"
              element={<VisionMission />}
            />

            {/* News SubNavs */}
            <Route
              path="/news/galeri-moment"
              element={<SchoolMomentsGallery />}
            />
            <Route
              path="/news/school-highlights"
              element={<SchoolHighlights />}
            />
            <Route
              path="/news/program-documentation"
              element={<ProgramDocumentation />}
            />

            {/* Administration SubNavs */}
            <Route
              path="/administration/principal"
              element={<PrincipalPage />}
            />
            <Route
              path="/administration/school-management"
              element={<SchoolManagementPage />}
            />
            <Route
              path="/administration/teachers&staff-directory"
              element={<TeachersAndStaffs />}
            />
            <Route
              path="/administration/student-affairs-unit"
              element={<StudentAffairsPage />}
            />
            <Route
              path="/administration/curriculum-management"
              element={<CurriculumManagementPage />}
            />
            <Route
              path="/administration/co-curriculum-management"
              element={<CoCurriculumPage />}
            />
            <Route
              path="/administration/special-education-integration-program-manaagement"
              element={<SEIPManagement />}
            />

            {/* Committee SubNavs */}
            <Route
              path="/committee/parent-teacher-association"
              element={<PTAPage />}
            />
            <Route path="/committee/pta-payments" element={<PtaPayment />} />
            <Route path="/committee/signupaguru" element={<SignIn />} />
            <Route path="/committee/alumni" element={<AlumniPage />} />

            {/* Achievements */}
            <Route path="/achievements" element={<SchoolAchievements />} />


            {/* Contact Us SubNavs */}
            <Route
              path="/contact-us/school-location"
              element={<MapsAndDirections />}
            />

            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </section>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

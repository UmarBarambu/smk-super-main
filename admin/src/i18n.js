import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome, Admin",
      profile: "Profile",
      settings: "Settings",
      logout: "Logout",
      allBookings: "All Bookings",
      filterByRoom: "Filter by Room Type:",
      user: "User",
      room: "Room",
      title: "Title",
      pic: "PIC",
      date: "Date",
      slot: "Slot",
      status: "Status",
      actions: "Actions",
      approve: "Approve",
      reject: "Reject",
      delete: "Delete Booking",
      manageRooms: "Manage Rooms",
      name: "Name",
      type: "Type",
      capacity: "Capacity",
      add: "Add",
      allTypes: "All Types",
      library: "Library",
      meeting: "Meeting Room",
      special: "Special Room",
      pleaseWait: "Please wait...",
    },
  },
  ms: {
    translation: {
      welcome: "Selamat datang, Admin",
      profile: "Profil",
      settings: "Tetapan",
      logout: "Log Keluar",
      allBookings: "Semua Tempahan",
      filterByRoom: "Tapis mengikut jenis bilik:",
      user: "Pengguna",
      room: "Bilik",
      title: "Tajuk",
      pic: "PIC",
      date: "Tarikh",
      slot: "Slot",
      status: "Status",
      actions: "Tindakan",
      approve: "Lulus",
      reject: "Tolak",
      delete: "Padam Tempahan",
      manageRooms: "Urus Bilik",
      name: "Nama",
      type: "Jenis",
      capacity: "Kapasiti",
      add: "Tambah",
      allTypes: "Semua Jenis",
      library: "Perpustakaan",
      meeting: "Bilik Mesyuarat",
      special: "Bilik Khas",
      pleaseWait: "Sila tunggu...",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

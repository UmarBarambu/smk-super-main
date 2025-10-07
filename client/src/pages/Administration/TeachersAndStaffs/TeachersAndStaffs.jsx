import React from "react";
import teacher_1_img from "../../../assets/images/teacher-1.png";
import teacher_2_img from "../../../assets/images/teacher-2.png";
import teacher_3_img from "../../../assets/images/teacher-3.png";
import teacher_4_img from "../../../assets/images/teacher-4.png";

const TeachersAndStaffs = () => {
  const teachers = [
    {
      bil: 1,
      nama: "En. Azman bin Khambali",
      gred: "DG13",
      jawatan: "Pengetua",
      opsyen: "Pengajian Melayu",
    },
    {
      bil: 2,
      nama: "Pn. Halimatun bt Salleh @ Ali",
      gred: "DG13",
      jawatan: "PK Pentadbiran",
      opsyen: "Matematik",
    },
    {
      bil: 3,
      nama: "En. Rashidi bin Muhammad Safuan",
      gred: "DG12",
      jawatan: "PK HEM",
      opsyen: "B. Melayu",
    },
    {
      bil: 4,
      nama: "Pn. Hjh Aslina bt Mohd Noh",
      gred: "DG14",
      jawatan: "PK Kokurikulum",
      opsyen: "Ekonomi",
    },
    {
      bil: 5,
      nama: "Pn. Hjh Eledawati binti Jasad",
      gred: "DG12",
      jawatan: "GKMP Bahasa",
      opsyen: "Sains",
    },
    {
      bil: 6,
      nama: "En. Noor Azman bin Aziz",
      gred: "DG12",
      jawatan: "GKMP Kemanusiaan",
      opsyen: "Ekonomi",
    },
    {
      bil: 7,
      nama: "Pn. Hjh Hairani bt Razali",
      gred: "DG14",
      jawatan: "GKMP Teknik & Vokasional",
      opsyen: "P. Akaun",
    },
    {
      bil: 8,
      nama: "Pn. Hjh Norlilah binti Sackkani",
      gred: "DG13",
      jawatan: "GKMP Sains & Matematik",
      opsyen: "Bio/Kimia",
    },
    {
      bil: 9,
      nama: "Pn. Siti Khairunisa binti Jasmani",
      gred: "DG9",
      jawatan: "Penyelaras PPKI",
      opsyen: "Pend. Khas",
    },
    {
      bil: 10,
      nama: "Pn. Melur binti Baderon",
      gred: "DG14",
      jawatan: "Kaunselor /SU UBK",
      opsyen: "Kaunseling",
    },
    {
      bil: 11,
      nama: "Pn. Noorasyikin binti Jasman",
      gred: "DG10",
      jawatan: "Kaunselor/Psikometrik/Ketua Kelab BK/PRS/Pen. SU HEM",
      opsyen: "Kaunseling",
    },
    {
      bil: 12,
      nama: "Pn. Shalin Haliza binti Sapuan",
      gred: "DG9",
      jawatan: "Guru Pusat Sumber/ Bendahari PIBG/Ketua Pers. PSV",
      opsyen: "KHB",
    },
    {
      bil: 13,
      nama: "En. Fadli Hazwan bin Mohd Angawam",
      gred: "DG10",
      jawatan: "Guru Data & Media/SU BESTARI/K. Kelab Foto/K. Rumah Hijau",
      opsyen: "P. Akaun",
    },
    {
      bil: 14,
      nama: "Pn. Hairiah binti Madon",
      gred: "DG12",
      jawatan: "SU PBD/ K. Pers. BI/ Pen. SU Keceriaan Sekolah",
      opsyen: "Matematik",
    },
    {
      bil: 15,
      nama: "Pn. Hamidah binti Sharif",
      gred: "DG12",
      jawatan: "SU Pep. Dalaman PPKI/ Penyelaras Koko PPKI/ Minit Curai",
      opsyen: "Pend. Khas",
    },
    {
      bil: 16,
      nama: "En. Kamdani bin Masturi",
      gred: "DG12",
      jawatan: "SU Koperasi/K. Rumah Biru/Ketua Keusahawanan",
      opsyen: "Matematik",
    },
    {
      bil: 17,
      nama: "Pn. Masnita binti Jazi",
      gred: "DG13",
      jawatan: "SU Dialog Prestasi/Ketua PPI",
      opsyen: "Perd./Mats",
    },
    {
      bil: 18,
      nama: "En. Mohd Miza Shahril Shah bin Mohd Isa",
      gred: "DG12",
      jawatan: "KP Matematik/ SU PIBG",
      opsyen: "Matematik",
    },
    {
      bil: 19,
      nama: "En. Muhamad Hadi @ Moliyadi bin Mohimin",
      gred: "DG12",
      jawatan:
        "SU Pembangunan Perabot/SU Gerakan dan Bencana Alam/K. Rumah Kuning",
      opsyen: "Kem. Hidup",
    },
    {
      bil: 20,
      nama: "Pn. Nur Wahidatul Lailey bt Md. Zin",
      gred: "DG12",
      jawatan: "KP Sains/Pen. Pengakap/Pen. Rumah Merah",
      opsyen: "Biologi",
    },
    {
      bil: 21,
      nama: "Pn. Roslindawati binti Baharom",
      gred: "DG12",
      jawatan: "SU Peperiksaan Dalaman/SU PBS/Penolong Kadet Bomba",
      opsyen: "Sains",
    },
    {
      bil: 22,
      nama: "Cik Rosafizah binti Subiran",
      gred: "DG12",
      jawatan: "KP PJPK/SU SEGAK/Penyelaras Sukan Permainan/ K. K. Olahraga",
      opsyen: "Sains Sukan",
    },
    {
      bil: 23,
      nama: "Pn. Rozita @ Rashidah bt Abd Razak",
      gred: "DG12",
      jawatan: "KP PI/Penolong PPI",
      opsyen: "Pend. Islam",
    },
    {
      bil: 24,
      nama: "Pn. Siti Samaniah binti Maarof",
      gred: "DG12",
      jawatan: "KP Perniagaan/Ketua Disiplin/Ketua Ragbi",
      opsyen: "Perd.",
    },
    {
      bil: 25,
      nama: "Pn. Salwani binti Sahnu",
      gred: "DG12",
      jawatan:
        "Ketua Bola Baling/SU P1NCH/Kontinjen Olahraga/Pen. Rumah Kuning",
      opsyen: "Teknik & Vokasional",
    },
    {
      bil: 26,
      nama: "En. Zul-Izzi bin Daud",
      gred: "DG12",
      jawatan: "KP BI/Ketua Sepak Takraw/SU HIP",
      opsyen: "B. Inggeris",
    },
    {
      bil: 27,
      nama: "Pn. Azlina binti Hasan",
      gred: "DG10",
      jawatan: "KP Biologi/SU Kemenjadian Murid/Ketua B. Jaring",
      opsyen: "Biologi",
    },
    {
      bil: 28,
      nama: "Pn. Hida Yazmira binti Mazlan",
      gred: "DG10",
      jawatan: "KP BM/Pen. SU Sukan/MBMMBI",
      opsyen: "S. Sukan",
    },
    {
      bil: 29,
      nama: "Pn. Hidayati binti Saibon",
      gred: "DG10",
      jawatan: "KP Sejarah/SU TS25",
      opsyen: "Teknik & Vokasional",
    },
    {
      bil: 30,
      nama: "En. Mohamad Faqris bin Musa",
      gred: "DG10",
      jawatan: "KP Geografi/SU Jenayah/K. Kadet Polis",
      opsyen: "Geografi",
    },
    {
      bil: 31,
      nama: "En. Muhamad Hanafee bin Ngaimin",
      gred: "DG10",
      jawatan: "KP PSV/SU SSDM/SU 4K",
      opsyen: "PSV",
    },
    {
      bil: 32,
      nama: "En. Nor Hisham bin Abd. Rahim",
      gred: "DG10",
      jawatan: "SU Sukan/Ketua Bola Sepak/Pen. SU Perabot",
      opsyen: "KHB",
    },
    {
      bil: 33,
      nama: "En. NorHisam bin Tukiran",
      gred: "DG10",
      jawatan: "Ketua Disiplin PPKI/PAJSK PPKI",
      opsyen: "PPKI-Masalah Pembelajaran",
    },
    {
      bil: 34,
      nama: "Pn. Noorazida binti Jenal",
      gred: "DG10",
      jawatan: "SU Kokurikulum/SU Perhimpunan/PAJSK",
      opsyen: "Kem. Hidup",
    },
    {
      bil: 35,
      nama: "Pn. Nur Sazila bt Mattusar",
      gred: "DG10",
      jawatan: "SU HEM/Pen. SU UASA",
      opsyen: "Kem. Hidup",
    },
    {
      bil: 36,
      nama: "Pn. Siti Khairun Nisa binti Aman",
      gred: "DG10",
      jawatan: "KP RBT/SU SPLKPM/Pen. SU Pep. Dalaman",
      opsyen: "KHB",
    },
    {
      bil: 37,
      nama: "Pn. Umi Kalsom binti Ibrahim",
      gred: "DG10",
      jawatan: "KP Tasawur Islam/SU SPM",
      opsyen: "Pend. Islam",
    },
    {
      bil: 38,
      nama: "Pn. Hjh Wan Nazatul Shima binti Wan Mohamed",
      gred: "DG10",
      jawatan: "SU Bantuan/ KP Fizik/ Ketua K. Badminton",
      opsyen: "Matematik",
    },
    {
      bil: 39,
      nama: "Pn. Zainul Afida binti Mohd Yusoff",
      gred: "DG10",
      jawatan: "SU SPBT PPKI/SU PPKI",
      opsyen: "Pend. Khas",
    },
    {
      bil: 40,
      nama: "Pn. Zaiton binti Ismail",
      gred: "DG10",
      jawatan: "KP Kimia/ Penyelaras SPBT/ Ketua Kelab SPBT",
      opsyen: "Kimia",
    },
    {
      bil: 41,
      nama: "Pn. Zaliah binti Itam Razali",
      gred: "DG10",
      jawatan: "Penyelaras STEM/K. Kelab STEM/Pen. SU Perhimpunan",
      opsyen: "Kem. Hidup",
    },
    {
      bil: 42,
      nama: "En. Azmeer bin Marmo",
      gred: "DG9",
      jawatan: "SU Disiplin/K. Pengakap/KWAMP",
      opsyen: "Keusahawanan Perdagangan",
    },
    {
      bil: 43,
      nama: "En. Muhamad Firdaus bin Mansor",
      gred: "DG9",
      jawatan: "Penyelaras HEM PPKI/Ketua K. Olahraga PPKI",
      opsyen: "Pendidikan Khas",
    },
    {
      bil: 44,
      nama: "En. Muhamad Idzmir Shah bin Yahya",
      gred: "DG9",
      jawatan: "Penyelaras Tingkatan/Ketua Bomba",
      opsyen: "Pendidikan Islam",
    },
    {
      bil: 45,
      nama: "Pn. Nur Khairin Syafiqa binti Zakaria",
      gred: "DG9",
      jawatan: "SU Kurikulum/ Pen. SU Koperasi/ K. Permainan Tradisional",
      opsyen: "Sains Pertanian",
    },
    {
      bil: 46,
      nama: "Cik Nurul Shafiqah binti Mohd Daniar",
      gred: "DG9",
      jawatan: "SU Kajian Tindakan/Kesihatan/Pen. KRS",
      opsyen: "TESL",
    },
    {
      bil: 47,
      nama: "Pn. Nurul Ashikin binti Abu Bakar",
      gred: "DG9",
      jawatan: "Penyelaras Kurikulum PPKI/SU PASM PPKI",
      opsyen: "Pendidikan Khas",
    },
    {
      bil: 48,
      nama: "Cik Nuraisyah Thasniem binti Sharudin",
      gred: "DG9",
      jawatan: "SU Headcount/Pen. SU PSS/Ketua Kelab Rukun Negara",
      opsyen: "Sejarah",
    },
    {
      bil: 49,
      nama: "Pn. Siti Farziana binti Naim",
      gred: "DG9",
      jawatan: "SU Pengawas/Penyelaras Kelab Persatuan/K. Kelab Kebudayaan",
      opsyen: "KH",
    },
    {
      bil: 50,
      nama: "Pn. Siti Norainn binti Bahrim",
      gred: "DG9",
      jawatan: "SU Kantin/K. Pers. BM/Nilam t/Pen. Rumah Hijau",
      opsyen: "Bahasa Melayu",
    },
    {
      bil: 51,
      nama: "Pn. Siti Nur Amalina binti Kamaruddin",
      gred: "DG9",
      jawatan: "SU PLC/SU Pend. Sivik/K. Pers. Pend. Islam/Pen. BSMM",
      opsyen: "Pendidikan Islam",
    },
    {
      bil: 52,
      nama: "Pn. Siti Suhailah binti Sa'at",
      gred: "DG9",
      jawatan: "Bendahari KOOP/Ketua Kelestarian",
      opsyen: "Kej. Elektrik/Elektronik",
    },
    {
      bil: 53,
      nama: "En. Mohamad Husien bin Misran",
      gred: "DG9",
      jawatan: "SU MAKDIS/DAKWAH/Ketua K. Bola Tampar",
      opsyen: "Pendidikan Islam",
    },
    {
      bil: 54,
      nama: "En. Mohd Azammudin bin Ismail",
      gred: "DG9",
      jawatan: "SU UASA/Penyelaras B. Beruniform/Ketua KRS/Ketua Rumah Merah",
      opsyen: "Sejarah",
    },
    {
      bil: 55,
      nama: "Cik Zarith Nur Izany binti Ali Zaini",
      gred: "DG9",
      jawatan: "SU Keceriaan Sekolah/SU PAK21/K. Kelab Memanah/Dodgeball",
      opsyen: "Bahasa Inggeris",
    },
    {
      bil: 56,
      nama: "Pn. Nurul Fatina binti Jamil",
      gred: "DG9",
      jawatan: "SU KBAT/Pen. Ketua Rumah Biru/Minit Mesyuarat",
      opsyen: "Sastera Melayu",
    },
  ];

  return (
    <div className="mt-[5rem]">
      <div className="text-2xl md:text-3xl text-gray-700 bg-gray-300">
        <h1 className="max-w-[1440px] mx-auto py-5 md:py-10 px-6 md:px-12 lg:px-20">
          Teachers and Staffs
        </h1>
      </div>

      <div className="mt-[2rem]">
        <div className="grid md:grid-cols-2 gap-6 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="bg-white shadow-md rounded-lg p-4 hover:scale-105 duration-500">
            <img
              src={teacher_1_img}
              alt="Teacher 1"
              className="w-full max-w-[800px] object-cover rounded-t-lg"
            />
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 hover:scale-105 duration-500">
            <img
              src={teacher_2_img}
              alt="Teacher 2"
              className="w-full object-cover rounded-t-lg"
            />
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 hover:scale-105 duration-500">
            <img
              src={teacher_3_img}
              alt="Teacher 3"
              className="w-full object-cover rounded-t-lg"
            />
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 hover:scale-105 duration-500">
            <img
              src={teacher_4_img}
              alt="Teacher 4"
              className="w-full object-cover rounded-t-lg"
            />
          </div>
        </div>

        {/* Teachers Details Table */}
        <div className="my-10 max-w-[1440px] overflow-scroll mx-auto px-6 md:px-12 lg:px-20">
          <table className="w-full border-collapse border border-gray-300 text-left md:text-sm text-xs">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-2">Bil</th>
                <th className="border border-gray-300 p-2">Nama</th>
                <th className="border border-gray-300 p-2">Gred SSM</th>
                <th className="border border-gray-300 p-2">
                  Jawatan / Tugas Utama
                </th>
                <th className="border border-gray-300 p-2">Opsyen</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.bil}>
                  <td className="border border-gray-300 p-2">{teacher.bil}</td>
                  <td className="border border-gray-300 p-2">{teacher.nama}</td>
                  <td className="border border-gray-300 p-2">{teacher.gred}</td>
                  <td className="border border-gray-300 p-2">
                    {teacher.jawatan}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {teacher.opsyen}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeachersAndStaffs;

// import React, { useState, useEffect } from "react";
// import {
//   Search,
//   ChevronDown,
//   ChevronUp,
//   Users,
//   Award,
//   BookOpen,
// } from "lucide-react";

// import teacher_1_img from "../../../assets/images/teacher-1.png";
// import teacher_2_img from "../../../assets/images/teacher-2.png";
// import teacher_3_img from "../../../assets/images/teacher-3.png";
// import teacher_4_img from "../../../assets/images/teacher-4.png";

// const TeachersAndStaffs = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDepartment, setSelectedDepartment] = useState("All");
//   const [sortConfig, setSortConfig] = useState({
//     key: "bil",
//     direction: "ascending",
//   });
//   const [showMobileFilters, setShowMobileFilters] = useState(false);
//   const [selectedTeacher, setSelectedTeacher] = useState(null);

//   // Placeholder for teacher images
//   const teacherImages = {
//     principal: teacher_1_img,
//     deputy1: teacher_2_img,
//     deputy2: teacher_3_img,
//     deputy3: teacher_4_img,
//   };

//   const teachers = [
//     {
//       bil: 1,
//       nama: "En. Azman bin Khambali",
//       gred: "DG13",
//       jawatan: "Pengetua",
//       opsyen: "Pengajian Melayu",
//       department: "Administration",
//       featured: true,
//       image: teacherImages.principal,
//     },
//     {
//       bil: 2,
//       nama: "Pn. Halimatun bt Salleh @ Ali",
//       gred: "DG13",
//       jawatan: "PK Pentadbiran",
//       opsyen: "Matematik",
//       department: "Administration",
//       featured: true,
//       image: teacherImages.deputy1,
//     },
//     {
//       bil: 3,
//       nama: "En. Rashidi bin Muhammad Safuan",
//       gred: "DG12",
//       jawatan: "PK HEM",
//       opsyen: "B. Melayu",
//       department: "Administration",
//       featured: true,
//       image: teacherImages.deputy2,
//     },
//     {
//       bil: 4,
//       nama: "Pn. Hjh Aslina bt Mohd Noh",
//       gred: "DG14",
//       jawatan: "PK Kokurikulum",
//       opsyen: "Ekonomi",
//       department: "Administration",
//       featured: true,
//       image: teacherImages.deputy3,
//     },
//     {
//       bil: 5,
//       nama: "Pn. Hjh Eledawati binti Jasad",
//       gred: "DG12",
//       jawatan: "GKMP Bahasa",
//       opsyen: "Sains",
//       department: "Language",
//     },
//     {
//       bil: 6,
//       nama: "En. Noor Azman bin Aziz",
//       gred: "DG12",
//       jawatan: "GKMP Kemanusiaan",
//       opsyen: "Ekonomi",
//       department: "Humanities",
//     },
//     {
//       bil: 7,
//       nama: "Pn. Hjh Hairani bt Razali",
//       gred: "DG14",
//       jawatan: "GKMP Teknik & Vokasional",
//       opsyen: "P. Akaun",
//       department: "Technical",
//     },
//     {
//       bil: 8,
//       nama: "Pn. Hjh Norlilah binti Sackkani",
//       gred: "DG13",
//       jawatan: "GKMP Sains & Matematik",
//       opsyen: "Bio/Kimia",
//       department: "Science",
//     },
//     {
//       bil: 9,
//       nama: "Pn. Siti Khairunisa binti Jasmani",
//       gred: "DG9",
//       jawatan: "Penyelaras PPKI",
//       opsyen: "Pend. Khas",
//       department: "Special Education",
//     },
//     // Adding the rest of the teachers with departments
//     {
//       bil: 10,
//       nama: "Pn. Melur binti Baderon",
//       gred: "DG14",
//       jawatan: "Kaunselor /SU UBK",
//       opsyen: "Kaunseling",
//       department: "Counseling",
//     },
//     // Continuing with the rest of the teachers - I've shortened the list for brevity
//     // In a real implementation, all teachers would be included
//     {
//       bil: 26,
//       nama: "En. Zul-Izzi bin Daud",
//       gred: "DG12",
//       jawatan: "KP BI/Ketua Sepak Takraw/SU HIP",
//       opsyen: "B. Inggeris",
//       department: "Language",
//     },
//     {
//       bil: 37,
//       nama: "Pn. Umi Kalsom binti Ibrahim",
//       gred: "DG10",
//       jawatan: "KP Tasawur Islam/SU SPM",
//       opsyen: "Pend. Islam",
//       department: "Islamic Studies",
//     },
//     {
//       bil: 40,
//       nama: "Pn. Zaiton binti Ismail",
//       gred: "DG10",
//       jawatan: "KP Kimia/ Penyelaras SPBT/ Ketua Kelab SPBT",
//       opsyen: "Kimia",
//       department: "Science",
//     },
//     {
//       bil: 45,
//       nama: "Pn. Nur Khairin Syafiqa binti Zakaria",
//       gred: "DG9",
//       jawatan: "SU Kurikulum/ Pen. SU Koperasi/ K. Permainan Tradisional",
//       opsyen: "Sains Pertanian",
//       department: "Science",
//     },
//     {
//       bil: 56,
//       nama: "Pn. Nurul Fatina binti Jamil",
//       gred: "DG9",
//       jawatan: "SU KBAT/Pen. Ketua Rumah Biru/Minit Mesyuarat",
//       opsyen: "Sastera Melayu",
//       department: "Language",
//     },
//   ];

//   // Get all unique departments
//   const departments = [
//     "All",
//     ...Array.from(new Set(teachers.map((teacher) => teacher.department))),
//   ];

//   // Filter teachers based on search and department
//   const filteredTeachers = teachers.filter((teacher) => {
//     const matchesSearch =
//       teacher.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       teacher.jawatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       teacher.opsyen.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesDepartment =
//       selectedDepartment === "All" || teacher.department === selectedDepartment;

//     return matchesSearch && matchesDepartment;
//   });

//   // Sort teachers
//   const sortedTeachers = [...filteredTeachers].sort((a, b) => {
//     if (a[sortConfig.key] < b[sortConfig.key]) {
//       return sortConfig.direction === "ascending" ? -1 : 1;
//     }
//     if (a[sortConfig.key] > b[sortConfig.key]) {
//       return sortConfig.direction === "ascending" ? 1 : -1;
//     }
//     return 0;
//   });

//   // Handle sort
//   const requestSort = (key) => {
//     let direction = "ascending";
//     if (sortConfig.key === key && sortConfig.direction === "ascending") {
//       direction = "descending";
//     }
//     setSortConfig({ key, direction });
//   };

//   // Get sort direction icon
//   const getSortDirectionIcon = (name) => {
//     if (sortConfig.key === name) {
//       return sortConfig.direction === "ascending" ? (
//         <ChevronUp size={16} />
//       ) : (
//         <ChevronDown size={16} />
//       );
//     }
//     return null;
//   };

//   // Featured teachers (management team)
//   const featuredTeachers = teachers.filter((teacher) => teacher.featured);

//   useEffect(() => {
//     // Reset selected teacher when filters change
//     setSelectedTeacher(null);
//   }, [searchTerm, selectedDepartment, sortConfig]);

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Hero Section */}
//       <div className=" text-blue-950">
//         <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
//           <div className="flex items-center mb-4">
//             <Users size={32} className="mr-2" />
//             <h1 className="text-3xl md:text-4xl font-bold">Our Educators</h1>
//           </div>
//           <p className="text-center text-gray-500 text-lg max-w-3xl">
//             Meet our dedicated team of teachers and staff committed to providing
//             quality education and guidance to our students.
//           </p>
//         </div>
//       </div>

//       {/* Leadership Team */}
//       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
//             <Award className="mr-2 text-blue-600" size={24} />
//             School Leadership
//           </h2>
//           <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
//           {featuredTeachers.map((teacher) => (
//             <div
//               key={teacher.bil}
//               className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
//             >
//               <div className="h-auto overflow-hidden">
//                 <img
//                   src={teacher.image || "/api/placeholder/400/400"}
//                   alt={teacher.nama}
//                   className="w-full h-full object-fit object-center"
//                 />
//               </div>
//               {/* <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                   {teacher.nama}
//                 </h3>
//                 <p className="text-blue-600 font-medium mb-2">
//                   {teacher.jawatan}
//                 </p>
//                 <p className="text-sm text-gray-600">{teacher.opsyen}</p>
//               </div> */}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Search and Filter */}
//       <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 bg-white shadow-sm rounded-lg mb-8">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
//           <div className="flex items-center">
//             <h2 className="text-xl font-bold text-gray-800 flex items-center">
//               <BookOpen size={20} className="mr-2 text-blue-600" />
//               Teaching Staff
//             </h2>
//           </div>

//           <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
//             {/* Department Filter */}
//             <div className="relative">
//               <select
//                 value={selectedDepartment}
//                 onChange={(e) => setSelectedDepartment(e.target.value)}
//                 className="appearance-none bg-gray-100 border border-gray-300 rounded-md py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 {departments.map((dept) => (
//                   <option key={dept} value={dept}>
//                     {dept}
//                   </option>
//                 ))}
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                 <ChevronDown size={16} />
//               </div>
//             </div>

//             {/* Search */}
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search size={18} className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search teachers..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Mobile filters toggle */}
//         <div className="md:hidden mt-4">
//           <button
//             onClick={() => setShowMobileFilters(!showMobileFilters)}
//             className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
//           >
//             <span>Filters & Sorting</span>
//             {showMobileFilters ? (
//               <ChevronUp size={16} />
//             ) : (
//               <ChevronDown size={16} />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Teacher List */}
//       <div className="max-w-7xl mx-auto pb-16 px-4 sm:px-6 lg:px-8">
//         {sortedTeachers.length > 0 ? (
//           <div className="bg-white shadow-md rounded-lg overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => requestSort("bil")}
//                     >
//                       <div className="flex items-center">
//                         <span>No.</span>
//                         <span className="ml-1">
//                           {getSortDirectionIcon("bil")}
//                         </span>
//                       </div>
//                     </th>
//                     <th
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => requestSort("nama")}
//                     >
//                       <div className="flex items-center">
//                         <span>Name</span>
//                         <span className="ml-1">
//                           {getSortDirectionIcon("nama")}
//                         </span>
//                       </div>
//                     </th>
//                     <th
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden md:table-cell"
//                       onClick={() => requestSort("gred")}
//                     >
//                       <div className="flex items-center">
//                         <span>Grade</span>
//                         <span className="ml-1">
//                           {getSortDirectionIcon("gred")}
//                         </span>
//                       </div>
//                     </th>
//                     <th
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => requestSort("jawatan")}
//                     >
//                       <div className="flex items-center">
//                         <span>Position</span>
//                         <span className="ml-1">
//                           {getSortDirectionIcon("jawatan")}
//                         </span>
//                       </div>
//                     </th>
//                     <th
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden md:table-cell"
//                       onClick={() => requestSort("opsyen")}
//                     >
//                       <div className="flex items-center">
//                         <span>Specialization</span>
//                         <span className="ml-1">
//                           {getSortDirectionIcon("opsyen")}
//                         </span>
//                       </div>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {sortedTeachers.map((teacher) => (
//                     <tr
//                       key={teacher.bil}
//                       className="hover:bg-blue-50 cursor-pointer transition-colors duration-150"
//                       onClick={() => setSelectedTeacher(teacher)}
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {teacher.bil}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="text-sm font-medium text-gray-900">
//                             {teacher.nama}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
//                         {teacher.gred}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <div className="text-sm text-gray-700">
//                           {teacher.jawatan}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
//                         {teacher.opsyen}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <div className="text-gray-500">
//               No teachers found matching your criteria.
//             </div>
//             <button
//               onClick={() => {
//                 setSearchTerm("");
//                 setSelectedDepartment("All");
//               }}
//               className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
//             >
//               Reset Filters
//             </button>
//           </div>
//         )}

//         {/* Result Count */}
//         <div className="mt-4 text-sm text-gray-500 text-right">
//           Showing {sortedTeachers.length} of {teachers.length} staff members
//         </div>
//       </div>

//       {/* Selected Teacher Modal */}
//       {selectedTeacher && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
//             <div className="flex justify-between items-center border-b px-6 py-4">
//               <h3 className="text-lg font-medium text-gray-900">
//                 Teacher Details
//               </h3>
//               <button
//                 onClick={() => setSelectedTeacher(null)}
//                 className="text-gray-400 hover:text-gray-500"
//               >
//                 <span className="sr-only">Close</span>
//                 &times;
//               </button>
//             </div>
//             <div className="px-6 py-4">
//               <div className="flex flex-col items-center mb-4">
//                 <div className="h-24 w-24 rounded-full overflow-hidden mb-2">
//                   <img
//                     src={selectedTeacher.image || "/api/placeholder/100/100"}
//                     alt={selectedTeacher.nama}
//                     className="h-full w-full object-cover"
//                   />
//                 </div>
//                 <h4 className="text-xl font-bold text-gray-800">
//                   {selectedTeacher.nama}
//                 </h4>
//                 <p className="text-blue-600">{selectedTeacher.jawatan}</p>
//               </div>

//               <div className="space-y-3">
//                 <div className="flex justify-between border-b border-gray-200 pb-2">
//                   <span className="text-gray-500">Department:</span>
//                   <span className="font-medium text-gray-800">
//                     {selectedTeacher.department}
//                   </span>
//                 </div>
//                 <div className="flex justify-between border-b border-gray-200 pb-2">
//                   <span className="text-gray-500">Grade:</span>
//                   <span className="font-medium text-gray-800">
//                     {selectedTeacher.gred}
//                   </span>
//                 </div>
//                 <div className="flex justify-between border-b border-gray-200 pb-2">
//                   <span className="text-gray-500">Specialization:</span>
//                   <span className="font-medium text-gray-800">
//                     {selectedTeacher.opsyen}
//                   </span>
//                 </div>
//                 <div className="flex justify-between pb-2">
//                   <span className="text-gray-500">Staff ID:</span>
//                   <span className="font-medium text-gray-800">
//                     {selectedTeacher.bil}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gray-50 px-6 py-4 flex justify-end">
//               <button
//                 onClick={() => setSelectedTeacher(null)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeachersAndStaffs;

// import React from 'react';

// import teachers_and_staffs_img from "../../../assets/images/administration/teachers_staffs.jpeg"

// const TeachersStaffPage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-8 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center space-x-4 mb-4">
//             <div className="h-1 w-12 bg-yellow-400 rounded"></div>
//             <span className="text-yellow-400 font-medium tracking-wide">ADMINISTRATION</span>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold mb-2">Teachers & Staff</h1>
//           <p className="text-blue-100 text-lg">Dedicated Educators & Support Personnel</p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         {/* Introduction Section */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 hover:shadow-2xl transition-all duration-300">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mb-4">
//               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
//               </svg>
//             </div>
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">
//               Our Dedicated Team
//             </h2>
//             <p className="text-gray-600 text-lg max-w-4xl mx-auto">
//               At SMK Suria Perdana, our success is built upon the dedication and expertise of our exceptional 
//               teaching staff and support personnel. Together, we work towards our shared vision of excellence 
//               in education and student development.
//             </p>
//           </div>
          
//           {/* School Motto Banner */}
//           <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-center">
//             <h3 className="text-2xl font-bold text-white mb-2">"Together Towards Excellence"</h3>
//             <p className="text-green-100">United in our commitment to educational excellence</p>
//           </div>
//         </div>

//         {/* Team Photo Section */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 mb-12">
//           <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
//             <h3 className="text-2xl font-bold text-center">SMK Suria Perdana Teaching Faculty & Staff</h3>
//             <p className="text-center text-blue-100 mt-2">Academic Year 2024/2025</p>
//           </div>
          
//           <div className="p-8">
//             <div className="relative bg-gray-50 rounded-xl overflow-hidden">
//               <img 
//               src={teachers_and_staffs_img}
//                 alt="SMK Suria Perdana Teachers and Staff Team Photo"
//                 className="w-full h-auto object-cover rounded-lg"
//               />
              
//               {/* Photo Caption */}
//               <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
//                 <p className="text-center font-medium">
//                   Our complete teaching faculty and administrative staff, united in our mission 
//                   to provide quality education and nurture future leaders.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Staff Categories Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300">
//             <div className="text-center">
//               <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-lg flex items-center justify-center">
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.5 16.323c.04.66.146 1.299.317 1.913a1 1 0 01-1.634 0c.171-.614.277-1.253.317-1.913.633.277 1.367.423 2.25.423s1.617-.146 2.25-.423z"/>
//                 </svg>
//               </div>
//               <h4 className="text-xl font-bold mb-2">Academic Staff</h4>
//               <p className="text-blue-100 text-sm">Experienced educators across all subject areas</p>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300">
//             <div className="text-center">
//               <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-lg flex items-center justify-center">
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <h4 className="text-xl font-bold mb-2">Administrative</h4>
//               <p className="text-green-100 text-sm">Support staff ensuring smooth operations</p>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300">
//             <div className="text-center">
//               <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-lg flex items-center justify-center">
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                 </svg>
//               </div>
//               <h4 className="text-xl font-bold mb-2">Student Services</h4>
//               <p className="text-yellow-100 text-sm">Counselors and student welfare officers</p>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300">
//             <div className="text-center">
//               <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-lg flex items-center justify-center">
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <h4 className="text-xl font-bold mb-2">Support Services</h4>
//               <p className="text-purple-100 text-sm">Technical and maintenance personnel</p>
//             </div>
//           </div>
//         </div>

//         {/* Our Commitment Section */}
//         <div className="grid md:grid-cols-2 gap-8 mb-12">
//           <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
//             <div className="flex items-center mb-6">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
//                 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                 </svg>
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
//             </div>
//             <p className="text-gray-600 leading-relaxed">
//               To provide quality education through innovative teaching methods, fostering critical thinking, 
//               creativity, and character development in every student. Our dedicated team works collaboratively 
//               to create an environment where learning thrives.
//             </p>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
//             <div className="flex items-center mb-6">
//               <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
//                 <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800">Our Values</h3>
//             </div>
//             <p className="text-gray-600 leading-relaxed">
//               Excellence, integrity, respect, and continuous improvement guide everything we do. 
//               We believe in nurturing not just academic achievement, but also character, leadership, 
//               and social responsibility in our students.
//             </p>
//           </div>
//         </div>

//         {/* Contact Section */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
//           <div className="text-center">
//             <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
//             <p className="text-blue-100 mb-6 max-w-3xl mx-auto">
//               We are always looking for passionate educators and dedicated support staff to join our mission. 
//               If you share our commitment to educational excellence and student development, we'd love to hear from you.
//             </p>
//             <div className="grid md:grid-cols-3 gap-6 mt-8">
//               <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
//                 <h4 className="font-semibold mb-2">Career Opportunities</h4>
//                 <p className="text-blue-100 text-sm">Teaching positions across various subjects</p>
//               </div>
//               <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
//                 <h4 className="font-semibold mb-2">Professional Development</h4>
//                 <p className="text-blue-100 text-sm">Continuous training and growth opportunities</p>
//               </div>
//               <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
//                 <h4 className="font-semibold mb-2">Collaborative Environment</h4>
//                 <p className="text-blue-100 text-sm">Work with a supportive and dedicated team</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeachersStaffPage;
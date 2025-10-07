import { Menu, X, User, LogOut, ChevronRight, Upload, Image, Users, Calendar, FileText, Home, Info } from 'lucide-react';

export default function SidebarNavItem({ icon, title, active, onClick }) {
    return (
      <button
        onClick={onClick}
        className={`flex items-center w-full px-6 py-3 transition duration-150 ease-in-out ${
          active 
            ? 'bg-indigo-900 text-white border-l-4 border-white' 
            : 'text-indigo-200 hover:bg-indigo-700'
        }`}
      >
        <span className="mr-3">{icon}</span>
        <span>{title}</span>
        {active && <ChevronRight size={16} className="ml-auto" />}
      </button>
    );
  }
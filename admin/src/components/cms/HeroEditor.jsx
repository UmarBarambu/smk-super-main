import { useState } from "react";
import FormField from "./FormField";
import { Menu, X, User, LogOut, ChevronRight, Upload, Image, Users, Calendar, FileText, Home, Info } from 'lucide-react';


// Hero Section Editor Component
export default function HeroEditor() {
    const [formData, setFormData] = useState({
      title: "Welcome to Our School",
      subtitle: "Nurturing minds, building futures",
      imageUrl: "/placeholder-hero.jpg"
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Axios call to update hero section would go here
      alert("Hero section updated successfully!");
    };
  
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <FormField
              label="Hero Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter main headline"
            />
            
            <FormField
              label="Subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Enter subtitle text"
            />
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Hero Image
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative h-40 w-64 bg-gray-100 rounded overflow-hidden">
                  <img 
                    src="/api/placeholder/640/360" 
                    alt="Hero preview" 
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="space-y-3">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  >
                    <Upload size={16} className="mr-2" />
                    Upload New Image
                  </button>
                  <p className="text-xs text-gray-500">
                    Recommended size: 1920×1080px
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
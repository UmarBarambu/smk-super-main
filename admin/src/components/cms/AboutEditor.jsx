import { useState } from "react";
import FormField from "./FormField";
import { Upload } from "lucide-react";

// About Section Editor Component
export default function AboutEditor() {
  const [formData, setFormData] = useState({
    title: "About Our School",
    description: "Founded in 1985, our school has been committed to academic excellence for over 35 years. We believe in nurturing not just academic skills but also character, creativity, and compassion.",
    imageUrl: "/about-school.jpg"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Axios call to update about section would go here
    alert("About section updated successfully!");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <FormField
            label="Section Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter section title"
          />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Describe your school"
            ></textarea>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              About Image (Optional)
            </label>
            <div className="flex items-center space-x-4">
              <div className="relative h-40 w-64 bg-gray-100 rounded overflow-hidden">
                <img 
                  src="/api/placeholder/640/360" 
                  alt="About section preview" 
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
                  Recommended size: 800×600px
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
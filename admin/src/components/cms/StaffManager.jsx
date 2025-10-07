import { useState } from "react";
import FormField from "./FormField";
import { Upload } from "lucide-react";


// Staff Profiles Manager Component
export default function StaffManager() {
  const [staffMembers, setStaffMembers] = useState([
    { id: 1, name: "Dr. Jane Smith", position: "Principal", photo: "/staff-1.jpg" },
    { id: 2, name: "John Davis", position: "Vice Principal", photo: "/staff-2.jpg" },
    { id: 3, name: "Sarah Johnson", position: "Math Department Head", photo: "/staff-3.jpg" }
  ]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentStaff, setCurrentStaff] = useState({
    id: null,
    name: "",
    position: "",
    photo: ""
  });

  const addNewStaff = () => {
    setIsEditing(true);
    setCurrentStaff({ id: Date.now(), name: "", position: "", photo: "" });
  };

  const editStaff = (staff) => {
    setIsEditing(true);
    setCurrentStaff(staff);
  };

  const deleteStaff = (id) => {
    if (window.confirm("Are you sure you want to remove this staff member?")) {
      setStaffMembers(staffMembers.filter(staff => staff.id !== id));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStaff(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (staffMembers.find(staff => staff.id === currentStaff.id)) {
      // Update existing staff
      setStaffMembers(staffMembers.map(staff => 
        staff.id === currentStaff.id ? currentStaff : staff
      ));
    } else {
      // Add new staff
      setStaffMembers([...staffMembers, currentStaff]);
    }
    
    setIsEditing(false);
    setCurrentStaff({ id: null, name: "", position: "", photo: "" });
  };

  return (
    <div className="space-y-6">
      {isEditing ? (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">
            {currentStaff.id ? "Edit Staff Member" : "Add New Staff Member"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <FormField
                label="Name"
                name="name"
                value={currentStaff.name}
                onChange={handleChange}
                placeholder="Staff member's name"
                required
              />
              
              <FormField
                label="Position"
                name="position"
                value={currentStaff.position}
                onChange={handleChange}
                placeholder="Staff member's position"
                required
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <div className="flex items-center space-x-4">
                  <div className="h-24 w-24 bg-gray-100 rounded-full overflow-hidden">
                    <img 
                      src="/api/placeholder/120/120" 
                      alt="Staff preview" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  >
                    <Upload size={16} className="mr-2" />
                    Upload Photo
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
                >
                  {currentStaff.id ? "Update" : "Add"} Staff Member
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Staff Members ({staffMembers.length})</h3>
            <button
              onClick={addNewStaff}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Add New Staff
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {staffMembers.map(staff => (
              <div key={staff.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-gray-100 rounded-full overflow-hidden">
                    <img 
                      src="/api/placeholder/80/80" 
                      alt={staff.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{staff.name}</h4>
                    <p className="text-sm text-gray-500">{staff.position}</p>
                  </div>
                  <div className="space-y-2">
                    <button 
                      onClick={() => editStaff(staff)}
                      className="block text-indigo-600 hover:text-indigo-800"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteStaff(staff.id)}
                      className="block text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
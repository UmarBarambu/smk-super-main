import { useState } from "react";
import { Upload } from "lucide-react";
import { FileText } from "lucide-react";


// File Uploader Component
export default function FileUploader() {
    const [files, setFiles] = useState([
      { id: 1, name: "School Calendar 2024-2025.pdf", type: "pdf", size: "245 KB", uploaded: "2024-12-10" },
      { id: 2, name: "Student Handbook.pdf", type: "pdf", size: "1.2 MB", uploaded: "2024-11-05" },
      { id: 3, name: "Summer Program Brochure.pdf", type: "pdf", size: "3.5 MB", uploaded: "2025-03-15" }
    ]);
  
    const deleteFile = (id) => {
      if (window.confirm("Are you sure you want to delete this file?")) {
        setFiles(files.filter(file => file.id !== id));
      }
    };
  
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Upload Documents</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
            <Upload size={48} className="text-gray-400 mb-4" />
            <p className="mb-2 text-sm text-gray-700">
              Drag and drop files here, or click to select files
            </p>
            <p className="text-xs text-gray-500">
              Supported formats: PDF, DOC, DOCX, XLS, XLSX (Max: 10MB)
            </p>
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Select Files
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Uploaded Documents ({files.length})</h3>
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Uploaded
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {files.map((file) => (
                  <tr key={file.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText size={20} className="text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {file.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <span className="text-sm text-gray-500">{file.size}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <span className="text-sm text-gray-500">
                        {new Date(file.uploaded).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                        Download
                      </button>
                      <button 
                        onClick={() => deleteFile(file.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
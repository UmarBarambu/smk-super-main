import React, { useState } from "react";
import axios from "axios";

const PtaPayment = () => {
  const [formData, setFormData] = useState({
    email: "",
    parentName: "",
    students: [
      { name: "", form: "", class: "" },
    ],
    amount: "",
    date: "",
    receipt: null,
  });

  const [loading, setLoading] = useState(false);

  // Available classes based on form selection
  const [availableClasses, setAvailableClasses] = useState({
    0: ["ELIT", "MUSYTARI", "UTARID", "URANUS", "ZUHRAH", "ZUHAL"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStudentChange = (index, field, value) => {
    const updatedStudents = [...formData.students];
    updatedStudents[index][field] = value;
    setFormData((prev) => ({ ...prev, students: updatedStudents }));

    // Update available classes if form changed
    if (field === "form") {
      if (["4", "5"].includes(value)) {
        setAvailableClasses((prev) => ({
          ...prev,
          [index]: ["MUSYTARI", "UTARID", "URANUS", "ZUHRAH", "ZUHAL"],
        }));
      } else {
        setAvailableClasses((prev) => ({
          ...prev,
          [index]: ["ELIT", "MUSYTARI", "UTARID", "URANUS", "ZUHRAH", "ZUHAL"],
        }));
      }
    }
  };

  const addStudent = () => {
    if (formData.students.length < 3) {
      setFormData((prev) => ({
        ...prev,
        students: [...prev.students, { name: "", form: "", class: "" }],
      }));
      setAvailableClasses((prev) => ({
        ...prev,
        [formData.students.length]: ["ELIT", "MUSYTARI", "UTARID", "URANUS", "ZUHRAH", "ZUHAL"],
      }));
    }
  };

  const removeStudent = (index) => {
    if (formData.students.length > 1) {
      const updatedStudents = formData.students.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, students: updatedStudents }));
      const newAvailableClasses = { ...availableClasses };
      delete newAvailableClasses[index];
      setAvailableClasses(newAvailableClasses);
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, receipt: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate parent details
    if (!formData.email || !formData.parentName) {
      alert("Please enter email and parent name.");
      return;
    }

    // Validate at least one student is added
    if (!formData.students || formData.students.length === 0) {
      alert("Please add at least one student.");
      return;
    }

    // Validate all students have complete information
    for (let student of formData.students) {
      if (!student.name || !student.form || !student.class) {
        alert("Please fill in all student details (name, form, and class).");
        return;
      }
    }

    // Validate other fields
    if (!formData.amount || !formData.date || !formData.receipt) {
      alert("Please fill in amount, date, and upload receipt.");
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email format
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const api_url = import.meta.env.VITE_API_URL;

    const data = new FormData();
    data.append("email", formData.email);
    data.append("parentName", formData.parentName);
    data.append("students", JSON.stringify(formData.students));
    data.append("amount", formData.amount);
    data.append("date", formData.date);
    data.append("receipt", formData.receipt);

    setLoading(true);
    try {
      const response = await axios.post(`${api_url}/pibg`, data);
      alert("✅ Payment submitted successfully");
      setFormData({
        email: "",
        parentName: "",
        students: [{ name: "", form: "", class: "" }],
        amount: "",
        date: "",
        receipt: null,
      });
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
    } catch (err) {
      console.error("Payment submission error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Error submitting payment";
      alert(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mt-5">
          PTA Payment Submission
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Payment Information Section */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4 text-center">Bank Details</h3>
          <div className="space-y-3 mb-6">
            <div className="p-3 bg-gray-50 rounded-md ">
              <p className="font-medium underline">Bank Name:</p>
              <p className="">CIMB Islamic</p>
              <p className="font-medium mt-2 underline">Account Name:</p>
              <p>PIBG SMK SURIA PERDANA</p>
              <p className="font-medium mt-2 underline">Account Number:</p>
              <p>8601500374</p>
            </div>
          </div>

          <h3 className="text-lg font-bold mb-4 text-center">
            Contact Information
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="font-medium underline">Phone:</p>
              <p>07-4541866</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="font-medium underline">Fax:</p>
              <p>07-4541867</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="font-medium underline">Email:</p>
              <p>jea0025@moe.edu.my</p>
            </div>
          </div>
        </div>

        {/* Payment Form Section */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email (to receive notification)
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Parent's Name
              </label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            {/* Students Section */}
            <div className="border-t pt-4 mt-4">
              <h4 className="text-lg font-bold mb-4 text-gray-800">
                Student Information (1-3 students)
              </h4>
              {formData.students.map((student, index) => (
                <div key={index} className="border p-4 rounded-md mb-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-semibold text-gray-700">Student {index + 1}</h5>
                    {formData.students.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStudent(index)}
                        className="bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Student's Name
                    </label>
                    <input
                      type="text"
                      value={student.name}
                      onChange={(e) => handleStudentChange(index, "name", e.target.value)}
                      className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Form
                      </label>
                      <select
                        value={student.form}
                        onChange={(e) => handleStudentChange(index, "form", e.target.value)}
                        className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                        required
                      >
                        <option value="">Select Form</option>
                        <option value="1">Form 1</option>
                        <option value="2">Form 2</option>
                        <option value="3">Form 3</option>
                        <option value="4">Form 4</option>
                        <option value="5">Form 5</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Class
                      </label>
                      <select
                        value={student.class}
                        onChange={(e) => handleStudentChange(index, "class", e.target.value)}
                        className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                        required
                      >
                        <option value="">Select Class</option>
                        {(availableClasses[index] || []).map((classOption) => (
                          <option key={classOption} value={classOption}>
                            {classOption}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              {formData.students.length < 3 && (
                <button
                  type="button"
                  onClick={addStudent}
                  className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-500 mb-4"
                >
                  + Add Another Student
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount (MYR)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payment Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Receipt
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition duration-500"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Payment"}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-md text-sm text-center">
        <p className="font-medium">Payment Processing Information:</p>
        <p>
          All payments made before 4pm (business day) will be processed on the
          next business day (T+1).
        </p>
      </div>
    </div>
  );
};

export default PtaPayment;

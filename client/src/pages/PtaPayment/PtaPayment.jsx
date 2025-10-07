import React, { useState } from "react";
import axios from "axios";




const PtaPayment = () => {
  const [formData, setFormData] = useState({
    email: "",
    parentName: "",
    childName: "",
    form: "",
    class: "",
    amount: "",
    date: "",
    receipt: null,
  });

  const [loading, setLoading] = useState(false);

  // Available classes based on form selection
  const [availableClasses, setAvailableClasses] = useState([
    "ELIT",
    "MUSYTARI",
    "UTARID",
    "URANUS",
    "ZUHRAH",
    "ZUHAL",
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update formData
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Dynamically update available classes based on form selection
    if (name === "form") {
      if (["4", "5"].includes(value)) {
        setAvailableClasses([
          "MUSYTARI",
          "UTARID",
          "URANUS",
          "ZUHRAH",
          "ZUHAL",
        ]); // Remove ELIT for Form 4–5
      } else {
        setAvailableClasses([
          "ELIT",
          "MUSYTARI",
          "UTARID",
          "URANUS",
          "ZUHRAH",
          "ZUHAL",
        ]); // Allow ELIT for Form 1–3
      }
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, receipt: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.parentName ||
      !formData.childName ||
      !formData.form ||
      !formData.class ||
      !formData.amount ||
      !formData.date ||
      !formData.receipt
    ) {
      alert("Please fill in all fields and upload a receipt.");
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email format
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

   const api_url = "http://localhost:5003/api";   // no1 problem fixed 




    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    setLoading(true);
    try {
      await axios.post(`${api_url}/pibg`, data);
      alert("✅ Payment submitted successfully");
      setFormData({
        email: "",
        parentName: "",
        childName: "",
        form: "",
        class: "",
        amount: "",
        date: "",
        receipt: null,
      });
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting payment");
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

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Child's Name
              </label>
              <input
                type="text"
                name="childName"
                value={formData.childName}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Form
              </label>
              <select
                name="form"
                value={formData.form}
                onChange={handleChange}
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
                name="class"
                value={formData.class}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                required
              >
                <option value="">Select Class</option>
                {availableClasses.map((classOption) => (
                  <option key={classOption} value={classOption}>
                    {classOption}
                  </option>
                ))}
              </select>
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

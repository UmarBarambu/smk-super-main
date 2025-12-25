import React, { useEffect, useState } from "react";
import { formatBookingDate } from "../../utils/formatDate";
import axios from "axios";
import toast from "react-hot-toast";

const Pibg = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [classFilter, setClassFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const rawApiUrl = import.meta.env.VITE_API_URL;
  const baseUrl = rawApiUrl.replace(/\/api\/?$/, "");

  const fetchPayments = async () => {
    const api_url = import.meta.env.VITE_API_URL;
    try {
      const res = await axios.get(`${api_url}/pibg`);
      setPayments(res.data);      
    } catch (err) {
      console.error(err);
      alert("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleStatusChange = async (id, status) => {
    const api_url = import.meta.env.VITE_API_URL;
    setUpdatingId(id);
    try {
      await axios.patch(`${api_url}/pibg/${id}`, { status });
      fetchPayments();
      toast.success("Updated status sent to user!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this payment? This action cannot be undone.")) return;
    const api_url = import.meta.env.VITE_API_URL;
    setDeletingId(id);
    try {
      await axios.delete(`${api_url}/pibg/${id}`);
      toast.success("Payment deleted successfully");
      fetchPayments();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete payment");
    } finally {
      setDeletingId(null);
    }
  };

  const downloadReport = async () => {
    const api_url = import.meta.env.VITE_API_URL;
    try {
      const res = await axios.get(`${api_url}/pibg/report`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "payment_report.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      toast.error("Failed to download report");
    }
  };

  const classOrder = [
    "ELIT",
    "MUSYTARI",
    "UTARID",
    "URANUS",
    "ZUHRAH",
    "ZUHAL",
  ];

  const classOptions = [
    { value: "all", label: "All Classes" },
    { value: "ELIT", label: "ELIT" },
    { value: "MUSYTARI", label: "MUSYTARI" },
    { value: "UTARID", label: "UTARID" },
    { value: "URANUS", label: "URANUS" },
    { value: "ZUHRAH", label: "ZUHRAH" },
    { value: "ZUHAL", label: "ZUHAL" },
  ];

  const sortedPayments = (() => {
    // When showing all classes, sort by newest payment first
    if (classFilter === "all") {
      return [...payments].sort((a, b) => {
        const aTs = new Date(a.createdAt || a.date).getTime() || 0;
        const bTs = new Date(b.createdAt || b.date).getTime() || 0;
        return bTs - aTs;
      });
    }

    // For class filtering, handle both new format (students array) and legacy format
    return [...payments].sort((a, b) => {
      // Get classes for a and b
      const aClasses = a.students && a.students.length > 0 
        ? a.students.map(s => s.class) 
        : [a.class];
      const bClasses = b.students && b.students.length > 0 
        ? b.students.map(s => s.class) 
        : [b.class];

      // Get the first class for sorting
      const aFirstClass = aClasses[0] || "";
      const bFirstClass = bClasses[0] || "";

      const aIdx = classOrder.indexOf(aFirstClass);
      const bIdx = classOrder.indexOf(bFirstClass);
      if (aIdx === -1 && bIdx === -1) return 0;
      if (aIdx === -1) return 1;
      if (bIdx === -1) return -1;
      return aIdx - bIdx;
    });
  })();

  const filteredPayments = sortedPayments.filter(p => {
    if (classFilter !== "all") {
      // Check if payment has students array (new format)
      if (p.students && p.students.length > 0) {
        // Check if any student matches the filter
        const hasMatchingClass = p.students.some(s => s.class === classFilter);
        if (!hasMatchingClass) return false;
      } else {
        // Legacy format - check p.class
        if (p.class !== classFilter) return false;
      }
    }
    if (dateFilter) {
      // compare using ISO YYYY-MM-DD from the payment date
      const pIso = new Date(p.date).toISOString().slice(0, 10);
      if (pIso !== dateFilter) return false;
    }
    return true;
  });

  return (
    <section className="p-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Payment Records</h2>
        <div className="flex gap-2 items-center">
          <label htmlFor="classFilter" className="font-medium text-gray-700">Filter by Class:</label>
          <select
            id="classFilter"
            value={classFilter}
            onChange={e => setClassFilter(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            {classOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <label htmlFor="dateFilter" className="font-medium text-gray-700">Date:</label>
          <input
            id="dateFilter"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button
            onClick={downloadReport}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download CSV
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading payments...</p>
      ) : payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Parent Name</th>
                <th className="px-4 py-2 border">Student Name(s)</th>
                <th className="px-4 py-2 border">Class(es)</th>
                <th className="px-4 py-2 border">Form(s)</th>
                <th className="px-4 py-2 border">Amount (MYR)</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Receipt</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((p) => {
                // Handle new format (students array) and legacy format
                let studentNames = p.childName || "N/A";
                let classes = p.class || "N/A";
                let forms = p.form || "N/A";

                if (p.students && p.students.length > 0) {
                  // Format as numbered list, each on new line
                  studentNames = p.students.map((s, i) => `${i + 1}. ${s.name}`).join("\n");
                  classes = p.students.map((s) => `${s.class}`).join("\n");
                  forms = p.students.map((s) => `Form ${s.form}`).join("\n");
                }

                return (
                  <tr key={p._id}>
                    <td className="px-4 py-2 border text-center">
                      {p.email}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {p.parentName}
                    </td>
                    <td className="px-4 py-2 border text-left whitespace-pre-wrap">
                      {studentNames}
                    </td>
                    <td className="px-4 py-2 border text-left whitespace-pre-wrap">{classes}</td>
                    <td className="px-4 py-2 border text-left whitespace-pre-wrap">{forms}</td>
                    <td className="px-4 py-2 border text-center">
                      <span className="font-bold mr-1">RM</span>
                      {p.amount}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {formatBookingDate(p.date)}
                    </td>
                    <td className="px-4 py-2 border capitalize text-center mx-auto">
                      {p.status || "pending"}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <a
                        href={`${baseUrl}/${p.receipt}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline text-center"
                      >
                        View
                      </a>
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex items-center gap-2">
                          <select
                            value={p.status || "pending"}
                            disabled={updatingId === p._id}
                            onChange={(e) => handleStatusChange(p._id, e.target.value)}
                            className="border rounded px-2 py-1 text-center mb-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="verified">Verified</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          {updatingId === p._id && (
                            <div className="inline-flex items-center gap-1 text-blue-600 text-xs" aria-label="Updating status">
                              <span className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                              <span>Updating...</span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleDelete(p._id)}
                          disabled={deletingId === p._id}
                          className="ml-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs"
                        >
                          {deletingId === p._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default Pibg;

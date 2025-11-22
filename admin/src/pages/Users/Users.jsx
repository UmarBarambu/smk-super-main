import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaEye, FaTrash } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "class_teacher" });

  const token = localStorage.getItem("adminToken");

  const loadUsers = async () => {
    try {
      setLoading(true);
      const api_url = import.meta.env.VITE_API_URL || "http://localhost:5002/api";
      const url = `${api_url}/auth/admin/users`;
      console.debug("Users -> fetching:", url);
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Failed to load users:", err);
      const status = err.response?.status;
      const body = err.response?.data;
      if (status === 404) {
        toast.error("Not found (404): Check API base URL or server routes");
      } else if (status === 401 || status === 403) {
        toast.error(body?.error || `Auth error (${status})`);
      } else {
        const msg = body?.error || err.message || "Failed to load users";
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const roleOptions = [
    "room_supervisor",
    "pta_treasurer",
    "store_admin",
    
  ];

  const handleCreateUser = async () => {
    const { name, email, password, role } = newUser;
    if (!name || !email || !password || !role) return toast.error("Please fill all fields");

    try {
      const api_url = import.meta.env.VITE_API_URL || "http://localhost:5002/api";
      const res = await axios.post(
        `${api_url}/auth/create-user`,
        { name, email, password, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("User created");
      // prepend created user to list
      setUsers((prev) => [res.data.user, ...prev]);
      setShowAddModal(false);
      setNewUser({ name: "", email: "", password: "", role: "class_teacher" });
    } catch (err) {
      console.error("Create user failed:", err);
      const msg = err.response?.data?.error || err.message || "Failed to create user";
      toast.error(msg);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user? This cannot be undone.")) return;

    try {
      const api_url = import.meta.env.VITE_API_URL;
      await axios.delete(`${api_url}/auth/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User deleted");
      setUsers((prev) => prev.filter((u) => u._id !== id));
      if (selectedUser && selectedUser._id === id) setSelectedUser(null);
    } catch (err) {
      console.error("Failed to delete user:", err);
      const msg = err.response?.data?.error || err.message || "Failed to delete user";
      toast.error(msg);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Users</h2>
        <div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Add New User
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2 text-center">{u.role === 'cooperation_store_admin' ? 'store_admin' : u.role}</td>
                  <td className="p-2 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedUser(u)}
                        title="View"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleDelete(u._id)}
                        title="Delete"
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Selected user modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">User Details</h3>
              <button onClick={() => setSelectedUser(null)} className="text-gray-600">✕</button>
            </div>
            <div className="space-y-2">
              <div>
                <strong>Name:</strong> {selectedUser.name}
              </div>
              <div>
                <strong>Email:</strong> {selectedUser.email}
              </div>
              <div>
                <strong>Role:</strong> {selectedUser.role}
              </div>
              <div>
                <strong>Created:</strong> {new Date(selectedUser.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setSelectedUser(null)} className="px-3 py-1 border rounded">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Add user modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Create New User</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-600">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  className="border px-2 py-1 w-full rounded"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="border px-2 py-1 w-full rounded"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  className="border px-2 py-1 w-full rounded"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Role</label>
                <select
                  className="border px-2 py-1 w-full rounded"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  {roleOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowAddModal(false)} className="px-3 py-1 border rounded">Cancel</button>
              <button onClick={handleCreateUser} className="px-3 py-1 bg-blue-600 text-white rounded">Create</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Users;

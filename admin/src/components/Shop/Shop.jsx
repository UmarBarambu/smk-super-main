import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { Plus, Search, Edit, Trash2, Eye, Filter, ChevronLeft, ChevronRight, Package, ShoppingBag, Users, Settings, LogOut, X, Upload, Star,} from "lucide-react";
import AdminOrderManagement from "./Orders";

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL;

// API Functions
const api = {
  async getProducts(page = 1, limit = 10, search = "", category = "") {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`, {
        params: { page, limit, search, category },
      });
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  async getProduct(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      return response.data; // Return the product data
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

async createProduct(formData) {
  try {
    const token = localStorage.getItem("adminToken");
    const response = await axios.post(`${API_BASE_URL}/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error.response?.data || error.message);
    throw error;
  }
},

  async updateProduct(id, productData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${id}`, productData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`, // Include token for authentication
        },
      });
      return response.data; // Return the updated product
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  async deleteProduct(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`, // Include token for authentication
        },
      });
      return response.data; // Return the delete confirmation
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },
};

const categories = [ "Uniforms", "Books",  "Accessories", "Others", "Form 1", "Form 2", "Form 3", "Form 4", "Form 5"];

function ProductForm({ product, onSave, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    images: [],
    sizes: [],
    featured: false,
    ...product,
  });

  const [newSize, setNewSize] = useState("");

 const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.name || !formData.category || !formData.price || !formData.stock) return;

  const data = new FormData();

data.append("name", formData.name);
data.append("description", formData.description || "");
data.append("category", formData.category);
data.append("price", formData.price.toString());
data.append("stock", formData.stock.toString());
data.append("featured", formData.featured ? "true" : "false");
data.append("isActive", formData.isActive ? "true" : "false");

// Fix sizes handling
if (formData.sizes && formData.sizes.length > 0) {
  data.append("sizes", JSON.stringify(formData.sizes));
}

// Keep images correct
if (formData.images && formData.images.length > 0) {
  formData.images.forEach((file) => data.append("images", file));
}


  onSave(data); // call your save function that posts to backend
};

  const addSize = () => {
    if (newSize && !formData.sizes.includes(newSize)) {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, newSize],
      }));
      setNewSize("");
    }
  };

  const removeSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((s) => s !== size),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSize();
    }
  };

  const [previewImage, setPreviewImage] = useState(
  formData.image ? [formData.image] : []
);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
  {/* Product Image - full width */}
  {/* Product Image - show only if adding new product */}
{!product && (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Product Image
    </label>
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={(e) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({ ...prev, images: files }));
        setPreviewImage(files.map((f) => URL.createObjectURL(f)));
      }}
    />

    {/* Preview */}
    <div className="flex gap-2 flex-wrap mt-2">
      {previewImage?.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt="preview"
          className="w-20 h-20 object-cover rounded-md border"
        />
      ))}
    </div>
  </div>
)}

  {/* Product Name + Category in 2 columns */}
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Product Name
      </label>
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.name}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Category
      </label>
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.category}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, category: e.target.value }))
        }
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* Description */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Description
    </label>
    <textarea
      rows={3}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={formData.description}
      onChange={(e) =>
        setFormData((prev) => ({ ...prev, description: e.target.value }))
      }
    />
  </div>

  {/* Price + Stock */}
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Price (RM)
      </label>
      <input
        type="number"
        step="0.01"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.price}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            price: parseFloat(e.target.value) || "",
          }))
        }
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Stock Quantity
      </label>
      <input
        type="number"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.stock}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            stock: parseInt(e.target.value) || "",
          }))
        }
      />
    </div>
  </div>

  {/* Sizes */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Sizes
    </label>
    <div className="flex gap-2 mb-2">
      <input
        type="text"
        placeholder="Add size (e.g., S, M, L)"
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={newSize}
        onChange={(e) => setNewSize(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        type="button"
        onClick={addSize}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Add
      </button>
    </div>
    <div className="flex flex-wrap gap-2">
      {formData.sizes.map((size) => (
        <span
          key={size}
          className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
        >
          {size}
          <button
            type="button"
            onClick={() => removeSize(size)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            <X size={14} />
          </button>
        </span>
      ))}
    </div>
  </div>

  {/* Featured */}
  <div className="flex items-center">
    <input
      type="checkbox"
      id="featured"
      className="mr-2"
      checked={formData.featured}
      onChange={(e) =>
        setFormData((prev) => ({ ...prev, featured: e.target.checked }))
      }
    />
    <label htmlFor="featured" className="text-sm font-medium text-gray-700">
      Featured Product
    </label>
  </div>

  {/* Buttons */}
  <div className="flex justify-end gap-3 pt-4">
    <button
      type="button"
      onClick={onCancel}
      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
    >
      Cancel
    </button>
    <button
      onClick={handleSubmit}
      disabled={
        isLoading ||
        !formData.name ||
        !formData.category ||
        !formData.price ||
        !formData.stock
      }
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
    >
      {isLoading ? "Saving..." : "Save Product"}
    </button>
  </div>
</div>

      </div>
    </div>
  );
}

function ProductTable({ products, onEdit, onDelete, onView }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                      {product.images && product.images.length > 0 ? (
                        <img
                           src={`${API_BASE_URL}/${product.images[0]}`}
                          // src={product.images[0]}
                          alt={product.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                          <Package size={20} className="text-gray-500" />
                        </div>
                      )}
                    </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 flex items-center">
                      {product.name}
                      {product.featured && (
                        <Star size={14} className="ml-2 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {product.description}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {product.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                RM {product.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span
                  className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    product.stock > 0
                      ? product.stock > 20
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.stock > 0 ? `${product.stock} units` : "Out of stock"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    product.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onView(product)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => onEdit(product)}
                    className="text-green-600 hover:text-green-900"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(product)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Sidebar({ currentView, onViewChange }) {
  const menuItems = [
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="bg-slate-800 text-white w-64 min-h-screen flex flex-col">
      <nav className="flex-1 px-4 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                currentView === item.id
                  ? "bg-slate-900 text-white"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

function TopTabNavigation({ currentView, onViewChange }) {
  const menuItems = [
    { id: "products", label: "Products" },
    { id: "orders", label: "Orders" },
  ];

  return (
    <div className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex space-x-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`text-lg font-medium px-4 py-2 rounded-md transition-colors ${
              currentView === item.id
                ? "bg-gray-600 text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SchoolShopAdmin() {
  const [currentView, setCurrentView] = useState("products");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Filters and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await api.getProducts(currentPage, 10, searchTerm, selectedCategory);
      setProducts(response.products);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentView === "products") {
      loadProducts();
    }
  }, [currentView, currentPage, searchTerm, selectedCategory]);

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

 // Save Product (Create / Update)
const handleSaveProduct = async (formData) => {
  setFormLoading(true);
  try {
    const token = localStorage.getItem("adminToken");

    let response;
    if (editingProduct?._id) {
      // ✅ Update
      response = await axios.put(
        `${API_BASE_URL}/products/${editingProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      // ✅ Create
      response = await axios.post(
        `${API_BASE_URL}/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    console.log("Product saved:", response.data);
    setShowForm(false);
    setEditingProduct(null);
    loadProducts();
  } catch (error) {
    console.error("Save product error:", error.response?.data || error.message);
  } finally {
    setFormLoading(false);
  }
};


  const handleDeleteProduct = async (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        await api.deleteProduct(product._id);
        loadProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleViewProduct = (product) => {
    console.log("View product:", product);
  };

  return(
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Tab Navigation */}
      <TopTabNavigation currentView={currentView} onViewChange={setCurrentView} />
 
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {currentView === "products" ? "All Products" : "Orders"}
              </h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {currentView === "products" && (
            <div className="space-y-6">
              {/* Filters and Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
                  <div className="relative">
                    <Search
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleCreateProduct}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Products Table */}
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-gray-500">Loading products...</div>
                </div>
              ) : products.length > 0 ? (
                <>
                  <ProductTable
                    products={products}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                    onView={handleViewProduct}
                  />

                  {/* Pagination */}
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-700">
                      Showing page {currentPage} of {totalPages}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="flex items-center px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        <ChevronLeft size={16} />
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="flex items-center px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Next
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Package size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-4">Get started by adding your first product.</p>
                  <button
                    onClick={handleCreateProduct}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                  >
                    <Plus size={20} />
                    <span>Add Product</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {currentView === "orders" && (
            // <div className="text-center py-12">
            //   <h3 className="text-lg font-medium text-gray-900 mb-2">Orders Section</h3>
            //   <p className="text-gray-500">This section is coming soon.</p>
            // </div>

            <AdminOrderManagement />
          )}
        </main>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          isLoading={formLoading}
        />
      )}
    </div>
  );
}

export default SchoolShopAdmin;


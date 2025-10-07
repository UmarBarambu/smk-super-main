import { useState, useEffect } from "react"
import axios from "axios"
import { Package, ShoppingCart, DollarSign, PlusCircle, Search, AlertTriangle } from "lucide-react"

// Components
import ProductForm from "../../components/Store/ProductForm";
import ProductTable from "../../components/Store/ProductTable";
import OrderTable from "../../components/Store/OrderTable";
import StatsCard from "../../components/Store/StatsCard";

const StoreAdmin = () => {
  const [activeTab, setActiveTab] = useState("products")
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    lowStockItems: 0,
  })

  // Fetch products, orders, and stats from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Fetch products
        // eslint-disable-next-line no-undef
        const productsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`)
        setProducts(productsResponse.data)

        // Fetch orders
        // eslint-disable-next-line no-undef
        const ordersResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`)
        setOrders(ordersResponse.data)

        // Fetch stats
        // eslint-disable-next-line no-undef
        const statsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/stats`)
        setStats(statsResponse.data)

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Handle product creation/update
  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        // Update existing product
        const response = await axios.put(
          // eslint-disable-next-line no-undef
          `${process.env.REACT_APP_API_URL}/api/products/${editingProduct._id}`,
          productData,
        )

        setProducts((prevProducts) =>
          prevProducts.map((product) => (product._id === editingProduct._id ? response.data : product)),
        )
      } else {
        // Create new product
        // eslint-disable-next-line no-undef
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/products`, productData)

        setProducts((prevProducts) => [...prevProducts, response.data])
      }

      setIsModalOpen(false)
      setEditingProduct(null)
    } catch (error) {
      console.error("Error saving product:", error)
      alert("Failed to save product. Please try again.")
    }
  }

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        // eslint-disable-next-line no-undef
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/products/${productId}`)
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId))
      } catch (error) {
        console.error("Error deleting product:", error)
        alert("Failed to delete product. Please try again.")
      }
    }
  }

  // Handle order status update
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      // eslint-disable-next-line no-undef
      await axios.put(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}/status`, {
        status: newStatus,
      })

      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order)),
      )
    } catch (error) {
      console.error("Error updating order status:", error)
      alert("Failed to update order status. Please try again.")
    }
  }

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || product.category === filterCategory

    return matchesSearch && matchesCategory
  })

  // Filter orders based on status
  const filteredOrders = orders.filter((order) => {
    return filterStatus === "all" || order.status === filterStatus
  })

  // Get unique categories for filter
  const categories = ["all", ...new Set(products.map((product) => product.category))]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4 md:mb-0">School Store Admin</h1>
          <button
            onClick={() => {
              setEditingProduct(null)
              setIsModalOpen(true)
            }}
            className="flex items-center bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 px-4 rounded-lg"
          >
            <PlusCircle size={20} className="mr-2" />
            Add New Product
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Revenue"
            value={`Rp ${stats.totalRevenue.toLocaleString("id-ID")}`}
            icon={<DollarSign size={24} />}
            color="bg-green-500"
          />
          <StatsCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={<ShoppingCart size={24} />}
            color="bg-blue-500"
          />
          <StatsCard
            title="Total Products"
            value={stats.totalProducts}
            icon={<Package size={24} />}
            color="bg-purple-500"
          />
          <StatsCard
            title="Low Stock Items"
            value={stats.lowStockItems}
            icon={<AlertTriangle size={24} />}
            color="bg-red-500"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b">
            <button
              className={`px-6 py-3 text-lg font-medium ${
                activeTab === "products"
                  ? "text-blue-900 border-b-2 border-blue-900"
                  : "text-gray-500 hover:text-blue-900"
              }`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </button>
            <button
              className={`px-6 py-3 text-lg font-medium ${
                activeTab === "orders"
                  ? "text-blue-900 border-b-2 border-blue-900"
                  : "text-gray-500 hover:text-blue-900"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </button>
            <button
              className={`px-6 py-3 text-lg font-medium ${
                activeTab === "analytics"
                  ? "text-blue-900 border-b-2 border-blue-900"
                  : "text-gray-500 hover:text-blue-900"
              }`}
              onClick={() => setActiveTab("analytics")}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "products" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4 md:mb-0">Product Management</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
              </div>
            ) : (
              <ProductTable
                products={filteredProducts}
                onEdit={(product) => {
                  setEditingProduct(product)
                  setIsModalOpen(true)
                }}
                onDelete={handleDeleteProduct}
              />
            )}
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4 md:mb-0">Order Management</h2>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
              </div>
            ) : (
              <OrderTable orders={filteredOrders} onUpdateStatus={handleUpdateOrderStatus} />
            )}
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-6">Sales Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium text-blue-900 mb-4">Monthly Sales</h3>
                <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                  <p className="text-gray-500">Sales chart will be displayed here</p>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium text-blue-900 mb-4">Top Categories</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Uniforms</span>
                    <div className="flex items-center">
                      <div className="w-48 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-900 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">45%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Books</span>
                    <div className="flex items-center">
                      <div className="w-48 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-900 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">30%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Supplies</span>
                    <div className="flex items-center">
                      <div className="w-48 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-900 h-2.5 rounded-full" style={{ width: "15%" }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">15%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Accessories</span>
                    <div className="flex items-center">
                      <div className="w-48 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-900 h-2.5 rounded-full" style={{ width: "10%" }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium text-blue-900 mb-4">Inventory Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>In Stock</span>
                    <span className="font-medium">{products.filter((p) => p.stock > 0).length} products</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Low Stock</span>
                    <span className="font-medium text-yellow-600">
                      {products.filter((p) => p.stock > 0 && p.stock <= 5).length} products
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Out of Stock</span>
                    <span className="font-medium text-red-600">
                      {products.filter((p) => p.stock === 0).length} products
                    </span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium text-blue-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order._id} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-900 mr-2"></div>
                      <span className="text-sm">
                        Order #{order.orderNumber} - {order.status}
                      </span>
                      <span className="ml-auto text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-6">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <ProductForm
                initialData={editingProduct || {}}
                onSave={handleSaveProduct}
                onCancel={() => {
                  setIsModalOpen(false)
                  setEditingProduct(null)
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StoreAdmin




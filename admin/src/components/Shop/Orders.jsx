import React, { useState, useEffect } from 'react';
import { Search, Eye, Check, X, Calendar, User, Phone, Mail, Package, DollarSign, FileText, Image, Clock, CheckCircle, XCircle } from 'lucide-react';
import axios from "axios";

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("adminToken");
      const api_url = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${api_url}/order`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
      console.log(response);
    } catch (err) {
      setError("Failed to fetch orders. Please try again.");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const handleOrderAction = async (orderId, action) => {
    try {
      const token = localStorage.getItem("adminToken");
      const api_url = import.meta.env.VITE_API_URL;
      await axios.patch(`${api_url}/order/${orderId}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update local state
      setOrders(orders.map(order =>
        order._id === orderId
          ? { ...order, status: action === "approve" ? "approved" : "rejected" }
          : order
      ));
      setShowConfirmModal(false);
      setConfirmAction(null);
    } catch (err) {
      setError(`Failed to ${action} order. Please try again.`);
      console.error(`Error ${action}ing order:`, err);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'MYR'
      // currency: 'NGN'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'approved':
        return 'text-green-600 bg-green-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const openConfirmModal = (order, action) => {
    setSelectedOrder(order);
    setConfirmAction(action);
    setShowConfirmModal(true);
  };

  const closeModals = () => {
    setShowOrderDetails(false);
    setShowReceiptModal(false);
    setShowConfirmModal(false);
    setSelectedOrder(null);
    setConfirmAction(null);
  };

const rawApiUrl = import.meta.env.VITE_API_URL;
const baseUrl = rawApiUrl.replace(/\/api\/?$/, "");

// Safe function to get full receipt URL
const getReceiptUrl = (filename) => {
  if (!filename) return "";
  // If filename already includes folder, just append to baseUrl
  return filename.startsWith("store-receipt/")
    ? `${baseUrl}/${filename}`
    : `${baseUrl}/store-receipt/${filename}`;
};




const isImage = (filename) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(filename);
const isPDF = (filename) => /\.pdf$/i.test(filename);

  return (
    <div className=" w-[100%]">


      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by email, name, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      ) : (
        /* Orders Table */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.user.fullName}</div>
                      <div className="text-sm text-gray-500">{order.user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.cartItems.length} item(s)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowOrderDetails(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        {order.status === 'pending' && (
                          <>
                            <button
                              onClick={() => openConfirmModal(order, 'approve')}
                              className="text-green-600 hover:text-green-900"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => openConfirmModal(order, 'reject')}
                              className="text-red-600 hover:text-red-900"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredOrders.length === 0 && !loading && (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters' : 'No orders have been placed yet'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
                <button
                  onClick={closeModals}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Customer Information
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="font-medium">{selectedOrder.user.name}</span>
                    </p>
                    <p className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{selectedOrder.user.email}</span>
                    </p>
                    <p className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{selectedOrder.phoneNumber}</span>
                    </p>
                  </div>
                </div>

                {/* Order Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Order Information
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p>
                      <span className="font-medium">Order ID:</span> {selectedOrder._id}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)}
                        <span className="ml-1 capitalize">{selectedOrder.status}</span>
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Date:</span> {formatDate(selectedOrder.createdAt)}
                    </p>
                    <p>
                      <span className="font-medium">Total:</span> {formatCurrency(selectedOrder.totalAmount)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Product</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Quantity</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Unit Price</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.cartItems.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm text-gray-900">{item.productName}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{formatCurrency(item.unitPrice)}</td>
                          <td className="px-4 py-2 text-sm font-medium text-gray-900">
                            {formatCurrency(item.quantity * item.unitPrice)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment Information */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p>
                      <span className="font-medium">Payment Method:</span> {selectedOrder.paymentNarration}
                    </p>
                    {selectedOrder.receiptImage && (
                      <div>
                        <span className="font-medium">Receipt:</span>
                        <button
                          onClick={() => setShowReceiptModal(true)}
                          className="ml-2 inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Image className="w-4 h-4 mr-1" />
                          View Receipt
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Notes</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      {selectedOrder.userNote || 'No additional notes provided'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {selectedOrder.status === 'pending' && (
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={() => openConfirmModal(selectedOrder, 'approve')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve Order
                  </button>
                  <button
                    onClick={() => openConfirmModal(selectedOrder, 'reject')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject Order
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
        {showReceiptModal && selectedOrder && selectedOrder.receiptImage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Payment Receipt</h2>
                <button onClick={() => setShowReceiptModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                {isImage(selectedOrder.receiptImage) ? (
                  <img
                    src={getReceiptUrl(selectedOrder.receiptImage)}
                    alt="Receipt"
                    className="max-w-full max-h-[70vh] rounded-lg shadow-lg"
                  />
                ) : isPDF(selectedOrder.receiptImage) ? (
                  <iframe
                    src={getReceiptUrl(selectedOrder.receiptImage)}
                    title="Receipt PDF"
                    className="w-full h-[70vh]"
                  />
                ) : (
                  <p>Unsupported file type</p>
                )}

                {/* Optional direct download link */}
                <a
                  href={getReceiptUrl(selectedOrder.receiptImage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-4 block text-center"
                >
                  Open Receipt in New Tab
                </a>
              </div>
            </div>
          </div>
        )}


      {/* Confirmation Modal */}
      {showConfirmModal && selectedOrder && confirmAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {confirmAction === 'approve' ? 'Approve Order' : 'Reject Order'}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to {confirmAction} order {selectedOrder._id}?
                This action cannot be undone.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleOrderAction(selectedOrder._id, confirmAction)}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md text-white ${
                    confirmAction === 'approve' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {confirmAction === 'approve' ? 'Approve' : 'Reject'}
                </button>
                <button
                  onClick={closeModals}
                  className="flex-1 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderManagement;
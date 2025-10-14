import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { CreditCard, MapPin, User, ShoppingBag, Upload } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  // const { cart, clearCart } = useContext(CartContext);
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentProof, setPaymentProof] = useState(null);
  const [optionalMessage, setOptionalMessage] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

// Fetch cart items from the API
const fetchCart = async () => {
  const api_url = import.meta.env.VITE_API_URL;

  try {
    setLoading(true);
    const token = localStorage.getItem("smk-user-token");
    if (!token) {
      console.error("Authorization token is missing");
      setCart([]); // reset to empty when no token
      return;
    }

    const response = await axios.get(`${api_url}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Cart API response:", response.data); //

    // ✅ Handle both possible structures
    if (Array.isArray(response.data.cart)) {
      setCart(response.data.cart);
    } else if (Array.isArray(response.data.items)) {
      setCart(response.data.items);
    } else {
      console.error("Unexpected response structure:", response.data);
      setCart([]);
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
    setCart([]);
    alert("Failed to fetch cart details. Please try again.");
  } finally {
    setLoading(false);
  }
};


  const [formData, setFormData] = useState({
    customerInfo: {
      name: user?.name || "",
      email: user?.email || "",
    },
    deliveryMethod: "pickup",
    deliveryAddress: {
      street: "",
      city: "",
      postalCode: "",
      notes: "",
    },
    paymentMethod: "bank_transfer",
  });

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );
  const deliveryFee = formData.deliveryMethod === "delivery" ? 15000 : 0;
  const total = subtotal + deliveryFee;

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    setPaymentProof(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const api_url =  import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("smk-user-token");
      if (!token) {
        alert("You must be logged in to place an order.");
        setLoading(false);
        return;
      }
      if (!paymentProof) {
        alert("Please upload your payment proof.");
        setLoading(false);
        return;
      }
      // Prepare form data for multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append("phoneNumber", phoneNumber);
      formDataToSend.append("paymentNarration", optionalMessage); // You can adjust this if you have a separate field
      formDataToSend.append("userNote", ""); // Add user note if you have it
      formDataToSend.append("receiptImage", paymentProof);
      // The server expects cart info from the DB, so just send the required fields

      // Send request
      const response = await axios.post(`${api_url}/order`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data && response.data.order) {
        alert("Order placed successfully!");
        setCart([]); // Optionally clear local cart state
        navigate("/school-shop");
      } else {
        alert("Order placement failed. Please try again.");
      }
    } catch (error) {
      console.error("Order creation error:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Add some products to proceed to checkout
          </p>
          <button
            onClick={() => navigate("/school-shop")}
            className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-blue-900">Checkout</h1>
          <p className="text-gray-600">Complete your order</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Customer Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customerInfo.name}
                      onChange={(e) =>
                        handleInputChange(
                          "customerInfo",
                          "name",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.customerInfo.email}
                      onChange={(e) =>
                        handleInputChange(
                          "customerInfo",
                          "email",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.customerInfo.phone}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Instructions
                </h2>
                <p className="text-sm text-yellow-700">
                  💳 Make Payment To:
                  <br />
                  <strong>Bank Name:</strong> (Maybank) Cooperation Store SMK
                  Suria Perdana
                  <br />
                  <strong>Account Name:</strong> KOP SMK SURIA PERDANA BATU
                  PAHAT BHD
                  <br />
                  <strong>Account Number:</strong> 551584059750
                  <br />
                  <strong>Amount to Pay:</strong> ₦
                  {total.toLocaleString("en-NG")}
                </p>
              </div>

              {/* Payment Proof */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Payment Proof
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Proof (Required)
                    </label>
                    <input
                      type="file"
                      required
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Optional Message
                    </label>
                    <textarea
                      value={optionalMessage}
                      onChange={(e) => setOptionalMessage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                      rows="3"
                      placeholder="Provide any additional context about your payment"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Processing..."
                  : `Place Order - ₦${total.toLocaleString("en-NG")}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Order Summary
              </h2>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div
                    key={`${item._id}-${item.size || "default"}`}
                    className="flex justify-between items-start"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {item.productId.name}
                      </p>
                      {item.size && (
                        <p className="text-xs text-gray-600">
                          Size: {item.size}
                        </p>
                      )}
                      <p className="text-xs text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      {/* Rp{" "} */}
                       RM{" "}
                      {(item.productId.price * item.quantity).toLocaleString(
                        "ms-MY"
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <hr className="my-4" />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  {/* <span>Rp {subtotal.toLocaleString("id-ID")}</span> */}
                  <span>RM {subtotal.toLocaleString("ms-MY")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>
                    {deliveryFee === 0
                      ? "Free"
                      : `RM ${deliveryFee.toLocaleString("ms-MY")}`}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-900">
                    {/* Rp {total.toLocaleString("id-ID")} */}
                     RM {total.toLocaleString("ms-MY")}
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center text-xs text-gray-600">
                <p>By placing this order, you agree to our</p>
                <p>Terms of Service and Privacy Policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

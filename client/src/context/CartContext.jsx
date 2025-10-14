import React, { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";

// Initial state
const initialState = {
  cart: [],
};
// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload };

    case "ADD_TO_CART": {
      const existingItemIndex = state.cart.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.size === action.payload.size
      );

      if (existingItemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, cart: updatedCart };
      }

      return { ...state, cart: [...state.cart, action.payload] };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            item._id !== action.payload._id ||
            item.size !== action.payload.size
        ),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    default:
      return state;
  }
};

// Context
export const CartContext = createContext();

// Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [loading, setLoading] = useState(false);

  const api_url = import.meta.env.VITE_API_URL;

  // Fetch cart from API
  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("⚠️ No token found, skipping cart fetch");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${api_url}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`, // make sure backend expects this
        },
      });

      dispatch({ type: "SET_CART", payload: response.data.items || [] });
    } catch (error) {
      console.error(
        "❌ Error fetching cart:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Actions
  const addToCart = (item) =>
    dispatch({ type: "ADD_TO_CART", payload: item });

  const removeFromCart = (item) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: item });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  // Only fetch cart if token exists
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        loading,
        addToCart,
        removeFromCart,
        clearCart,
        fetchCart, // exposed for manual refresh
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartAPI } from '../services/api';
import { useAlert } from './AlertContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const { success, error } = useAlert();

  // Fetch cart on mount
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const response = await cartAPI.get();
      setCart(response.data.data);
      setCartCount(response.data.data.totalItems || 0);
    } catch (err) {
      console.error('Error fetching cart:', err);
      error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  }, [error]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await cartAPI.add(productId, quantity);
      setCart(response.data.data);
      setCartCount(response.data.data.totalItems || 0);
      success('Item added to cart!');
      return true;
    } catch (err) {
      console.error('Error adding to cart:', err);
      error(err.message || 'Failed to add item to cart');
      return false;
    }
  };

  // Update cart item quantity
  const updateCartItem = async (itemId, quantity) => {
    try {
      const response = await cartAPI.update(itemId, quantity);
      setCart(response.data.data);
      setCartCount(response.data.data.totalItems || 0);
      success('Cart updated!');
      return true;
    } catch (err) {
      console.error('Error updating cart:', err);
      error(err.message || 'Failed to update cart');
      return false;
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      const response = await cartAPI.remove(itemId);
      setCart(response.data.data);
      setCartCount(response.data.data.totalItems || 0);
      success('Item removed from cart');
      return true;
    } catch (err) {
      console.error('Error removing from cart:', err);
      error('Failed to remove item from cart');
      return false;
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      const response = await cartAPI.clear();
      setCart(response.data.data);
      setCartCount(0);
      return true;
    } catch (err) {
      console.error('Error clearing cart:', err);
      error('Failed to clear cart');
      return false;
    }
  };

  const value = {
    cart,
    cartCount,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refreshCart: fetchCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
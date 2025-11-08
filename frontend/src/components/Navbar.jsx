// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiHome, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-r from-primary-600 to-secondary-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-white font-bold text-xl hover:scale-105 transition-transform"
          >
            <FiShoppingBag className="text-2xl" />
            <span className="hidden sm:block">Vibe Commerce</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/')
                  ? 'bg-white/20 text-white'
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FiHome className="text-xl" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link
              to="/products"
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/products')
                  ? 'bg-white/20 text-white'
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FiShoppingBag className="text-xl" />
              <span className="hidden sm:inline">Products</span>
            </Link>

            <Link
              to="/cart"
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all relative ${
                isActive('/cart')
                  ? 'bg-white/20 text-white'
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="relative">
                <FiShoppingCart className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce-slow">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
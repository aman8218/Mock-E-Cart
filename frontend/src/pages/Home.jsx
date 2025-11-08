// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiTrendingUp, FiShield, FiTruck, FiArrowRight } from 'react-icons/fi';

const Home = () => {
  const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Vibe Commerce
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Discover amazing products at unbeatable prices. Shop with confidence and experience the future of online shopping!
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
              >
                <FiShoppingBag size={24} />
                <span>Start Shopping</span>
                <FiArrowRight size={20} />
              </Link>
            </div>

            {/* Image */}
            <div className="relative animate-slide-up">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-3xl blur-3xl opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80"
                alt="Shopping"
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Us?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all hover:scale-105">
              <div className="bg-blue-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FiTrendingUp size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Latest Products</h3>
              <p className="text-gray-600">
                Curated collection of trending items across all categories with the best quality.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all hover:scale-105">
              <div className="bg-green-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FiShield size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Shopping</h3>
              <p className="text-gray-600">
                Your data and transactions are protected with top-tier security measures.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all hover:scale-105">
              <div className="bg-purple-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FiTruck size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable shipping to your doorstep with real-time tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Shop by Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="group relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all hover:scale-105 p-6 sm:p-8 text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <h3 className="relative text-lg sm:text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
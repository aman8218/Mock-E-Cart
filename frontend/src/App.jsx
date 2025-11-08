// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AlertProvider } from './context/AlertContext';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Alert from './components/Alert.jsx';

// Pages
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';

function App() {
  return (
    <Router>
      <AlertProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <Alert />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AlertProvider>
    </Router>
  );
}

export default App;
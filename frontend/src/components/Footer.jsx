// src/components/Footer.js
import React from 'react';
import { FiHeart, FiGithub } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="mt-auto bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="flex items-center gap-2 text-lg">
            Made with <FiHeart className="text-red-400 animate-pulse" /> for Nexora Internship
          </p>
          <p className="text-white/80 text-sm">
            © {new Date().getFullYear()} Vibe Commerce. All rights reserved.
          </p>
          <a
            href="https://github.com/aman8218/Mock-E-Cart"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <FiGithub size={20} />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
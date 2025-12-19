import React from 'react';
import { chef } from '../assets/images';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <img 
                src={chef} 
                alt="GruhMate Logo" 
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">GruhMate</span>
            </div>
            <p className="text-gray-400 mt-2">Smart kitchen management for modern families</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400">© 2026 GruhMate. All rights reserved.</p>
            <p className="text-gray-500 text-sm mt-2">Made with ❤️ for smarter kitchens</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
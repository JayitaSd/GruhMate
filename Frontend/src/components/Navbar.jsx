// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { chef } from "../assets/images";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import axios from "axios";
// import { chef } from "../assets/images";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";
export default function Navbar() {
    const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
   const handleLogout = () => {
      
    logout();
    navigate("/", { replace: true });
  };
  return (
  //   <header className="sticky top-0 z-50 bg-white shadow-sm">
  //       <div className="container mx-auto px-6"></div>
  //   <nav className="hidden md:flex items-center space-x-8">
          <div className=" bg-gray-50">
            <header className="bg-white shadow p-4 flex justify-between">
              <div className="flex items-center gap-2">
                <img src={chef} alt="logo" className="w-8 h-8" />
                <span className="font-bold text-xl">GruhMate</span>
              </div>
                 {/* <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
                   Home
                 </Link> */}
                 <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                   Dashboard
                 </Link>
                 <Link to="/compare" className="text-gray-700 hover:text-blue-600 font-medium">
                   Price Compare
                 </Link>
                 <Link to="/teams" className="text-gray-700 hover:text-blue-600 font-medium">
                   Teams
                 </Link>
                 <Link to="/stockform" className="text-gray-700 hover:text-blue-600 font-medium">
                   Add Stock
                 </Link>
                 <Link to="/buylist" className="text-gray-700 hover:text-blue-600 font-medium">
                   BuyList
                 </Link>
               {/* </nav> */}
               {/* <div className="text-right hidden md:block"> */}
                {/* <p className="text-sm font-medium text-gray-900">
                  Welcome, {currentUser?.name || 'User'}
                </p> */}
                <Link to="/profile" className="text-right hidden md:block cursor-pointer">
  <p className="text-sm font-medium text-gray-900 hover:text-blue-600">
    Welcome, {currentUser?.name || "User"}
  </p>
  <p className="text-xs text-gray-500">Family Account</p>
</Link>

                {/* <p className="text-xs text-gray-500">Family Account</p>
              </div> */}
               <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium">
                  {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
                <button
                onClick={handleLogout}
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
               </header>
               </div>
  );
}

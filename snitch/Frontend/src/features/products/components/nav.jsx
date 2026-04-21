import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, User, Menu, LogIn } from "lucide-react";
import SearchBar from './SearchBar';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, loading } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.product.addToCard);
  const count = cart?.cart?.items?.length || 0;

  // 🔥 Seller check
  const isSeller = user?.role === "seller";

  // 🔥 Dynamic Nav Links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "Archive", path: "/archive" },

    ...(isSeller
      ? [
          { name: "Create", path: "/createProduct" },
          { name: "MyProducts", path: "/getProducts" },
        ]
      : [])
  ];

  // 🔥 Loading guard (NO FLICKER)
  if (loading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#05070a] h-[70px]" />
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-md bg-[#05070a]/70 border-b border-white/[0.03] px-6 py-4">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => navigate("/")}
        >
          <div className="w-9 h-9 bg-white text-black flex items-center justify-center font-black text-sm rounded-sm">
            V
          </div>
          <h1 className="text-xl font-black tracking-[0.3em] text-white uppercase">
            VOGUE<span className="text-emerald-500">NR</span>
          </h1>
        </div>

        {/* Search */}
        <div className="hidden lg:block w-full max-w-md mx-8">
          <SearchBar />
        </div>

        {/* Right */}
        <div className="flex items-center gap-6 md:gap-8">

          {/* Nav Links */}
          <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.25em] font-black text-slate-500">
            {navLinks.map((link) => (
              <span 
                key={link.name}
                onClick={() => navigate(link.path)}
                className={`cursor-pointer hover:text-white ${
                  location.pathname === link.path ? "text-white" : ""
                }`}
              >
                {link.name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 border-l border-white/10 pl-6">

            {/* Cart */}
            <div 
              className="relative cursor-pointer"
              onClick={() => navigate("/addToCart")}
            >
              <ShoppingBag size={18} className="text-slate-300" />
              
              {count > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 bg-white text-black text-[9px] h-4 w-4 flex items-center justify-center rounded-full"
                >
                  {count}
                </motion.span>
              )}
            </div>

            {/* 🔥 AUTH SECTION */}
            {!user ? (
              <div className="hidden md:flex items-center gap-3">
                <button 
                  onClick={() => navigate("/login")}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate("/register")}
                  className="bg-white text-black px-3 py-1 text-xs rounded"
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">

                {/* Seller Button */}
                {isSeller && (
                  <button 
                    onClick={() => navigate("/createProduct")}
                    className="text-emerald-400 text-xs"
                  >
                    Sell
                  </button>
                )}

                {/* Profile */}
                <div 
                  onClick={() => navigate("/profile")} 
                  className="cursor-pointer"
                >
                  <User size={18} className="text-slate-300" />
                </div>
              </div>
            )}

            {/* Mobile */}
            <div className="flex md:hidden items-center gap-2">
              {!user && (
                <div onClick={() => navigate("/login")}>
                  <LogIn size={20} />
                </div>
              )}

              {isSeller && (
                <div onClick={() => navigate("/createProduct")}>
                  🛒
                </div>
              )}

              <Menu size={20} />
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
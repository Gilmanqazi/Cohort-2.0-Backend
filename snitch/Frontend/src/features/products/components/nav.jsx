import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, User, Menu, LogIn } from "lucide-react";
import SearchBar from './SearchBar';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Maan lete hain ki auth state aapke redux mein hai
  // Agar nahi hai toh aap ise apne logic ke hisaab se check kar sakte hain
  const user = useSelector((state) => state.auth?.user || null); 
  const cart = useSelector((state) => state.product.addToCard);
  const count = cart?.cart?.items?.length || 0;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "Archive", path: "/archive" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-md bg-[#05070a]/70 border-b border-white/[0.03] px-6 py-4">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        
        {/* --- Logo Section --- */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => navigate("/")}
        >
          <div className="relative">
            <div className="w-9 h-9 bg-white text-black flex items-center justify-center font-black text-sm rounded-sm group-hover:bg-emerald-500 transition-colors duration-500">
              V
            </div>
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#05070a] shadow-[0_0_8px_#06b6d4]" />
          </div>
          
          <h1 className="text-xl font-black tracking-[0.3em] text-white uppercase overflow-hidden">
            VOGUE<span className="text-emerald-500 group-hover:italic transition-all">NR</span>
          </h1>
        </div>

        {/* --- Center Search --- */}
        <div className="hidden lg:block w-full max-w-md mx-8">
          <SearchBar />
        </div>

        {/* --- Right Actions --- */}
        <div className="flex items-center gap-6 md:gap-8">
          
          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.25em] font-black text-slate-500">
            {navLinks.map((link) => (
              <span 
                key={link.name}
                onClick={() => navigate(link.path)}
                className={`cursor-pointer hover:text-white transition-all relative py-1 group ${
                  location.pathname === link.path ? "text-white" : ""
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[1px] bg-emerald-500 transition-all duration-300 ${
                  location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 border-l border-white/10 pl-6">
            {/* Cart Icon */}
            <div 
              className="relative group cursor-pointer mr-2" 
              onClick={() => navigate("/addToCart")}
            >
              <div className="p-2.5 group-hover:bg-white/5 rounded-full transition-all duration-300">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-slate-300 group-hover:text-emerald-400" />
              </div>
              
              {count > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 bg-white text-black text-[9px] font-black h-4 w-4 flex items-center justify-center rounded-full ring-2 ring-[#05070a]"
                >
                  {count}
                </motion.span>
              )}
            </div>

            {/* --- Auth Buttons Section --- */}
            {!user ? (
              <div className="hidden md:flex items-center gap-3">
                <button 
                  onClick={() => navigate("/login")}
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all px-4 py-2"
                >
                  Log_In
                </button>
                <button 
                  onClick={() => navigate("/register")}
                  className="text-[10px] font-black uppercase tracking-[0.2em] bg-white text-black px-5 py-2.5 rounded-sm hover:bg-emerald-500 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                >
                  Join_Club
                </button>
              </div>
            ) : (
              <div 
                className="hidden md:block p-2.5 hover:bg-white/5 rounded-full cursor-pointer transition-all border border-white/5"
                onClick={() => navigate("/profile")}
              >
                <User size={18} strokeWidth={1.5} className="text-slate-300 hover:text-white" />
              </div>
            )}

            {/* Mobile Menu / Auth Icon */}
            <div className="flex md:hidden items-center gap-2">
              {!user && (
                 <div onClick={() => navigate("/login")} className="p-2 text-slate-300">
                    <LogIn size={20} strokeWidth={1.5} />
                 </div>
              )}
              <div className="p-2 hover:bg-white/5 rounded-full cursor-pointer transition-all">
                <Menu size={20} strokeWidth={1.5} className="text-slate-300" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
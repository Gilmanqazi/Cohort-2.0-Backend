import React, { useState } from 'react'; // useState add kiya
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // AnimatePresence add kiya
import { ShoppingBag, User, Menu, LogIn, X } from "lucide-react"; // X icon add kiya
import SearchBar from './SearchBar';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state

  const { user, loading } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.product.addToCard);
  const count = cart?.cart?.items?.length || 0;

  const isSeller = user?.role === "seller";

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

  if (loading) {
    return <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#05070a] h-[70px]" />;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-md bg-[#05070a]/80 border-b border-white/[0.03]">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
        
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

        {/* Search (Hidden on Mobile) */}
        <div className="hidden lg:block w-full max-w-md mx-8">
          <SearchBar />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6 md:gap-8">

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.25em] font-black text-slate-500">
            {navLinks.map((link) => (
              <span 
                key={link.name}
                onClick={() => navigate(link.path)}
                className={`cursor-pointer hover:text-white transition-colors ${
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
                  className="absolute -top-2 -right-2 bg-emerald-500 text-black text-[9px] h-4 w-4 flex items-center justify-center rounded-full font-bold"
                >
                  {count}
                </motion.span>
              )}
            </div>

            {/* Auth Section (Desktop) */}
            {!user ? (
              <div className="hidden md:flex items-center gap-3">
                <button onClick={() => navigate("/login")} className="text-slate-400 hover:text-white text-xs uppercase tracking-widest font-bold">
                  Login
                </button>
                <button onClick={() => navigate("/register")} className="bg-white text-black px-4 py-1.5 text-[10px] uppercase font-black rounded-sm">
                  Register
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <div onClick={() => navigate("/profile")} className="cursor-pointer hover:opacity-70">
                  <User size={18} className="text-slate-300" />
                </div>
              </div>
            )}

            {/* Mobile Toggle Button */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#0a0d14] border-b border-white/10 p-6 md:hidden flex flex-col gap-6 shadow-2xl"
          >
            {/* Mobile Search */}
            <div className="lg:hidden w-full">
              <SearchBar />
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col gap-4 uppercase tracking-[0.2em] text-[12px] font-black">
              {navLinks.map((link) => (
                <span
                  key={link.name}
                  onClick={() => {
                    navigate(link.path);
                    setIsOpen(false);
                  }}
                  className={`py-2 ${location.pathname === link.path ? "text-emerald-500" : "text-slate-400"}`}
                >
                  {link.name}
                </span>
              ))}
            </div>

            <hr className="border-white/5" />

            {/* Mobile Auth */}
            {!user ? (
              <div className="flex flex-col gap-3">
                <button onClick={() => navigate("/login")} className="w-full py-3 text-slate-300 border border-white/10 rounded uppercase text-[10px] font-bold">
                  Login
                </button>
                <button onClick={() => navigate("/register")} className="w-full py-3 bg-white text-black rounded uppercase text-[10px] font-black">
                  Register
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between py-2" onClick={() => { navigate("/profile"); setIsOpen(false); }}>
                <span className="text-slate-400 uppercase text-[10px] font-bold">Account Settings</span>
                <User size={20} className="text-white" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
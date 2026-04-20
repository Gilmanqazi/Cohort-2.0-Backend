import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../Hook/useProduct';
import { Search, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = () => {
  const [term, setTerm] = useState("");
  const { handleSearch } = useProduct();
  const navigate = useNavigate();
  
  const suggestions = useSelector((state) => state.product.searchResults);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (term.trim() !== "") {
        handleSearch(term);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [term]);

  return (
    <div className="relative w-full group">
      {/* --- Search Input Container --- */}
      <div className="relative flex items-center">
        <Search 
          className={`absolute left-4 transition-colors duration-300 ${term ? 'text-emerald-400' : 'text-slate-500'}`} 
          size={16} 
        />
        
        <input
          type="text"
          className="w-full pl-11 pr-12 py-2.5 bg-white/[0.03] border border-white/10 rounded-full text-[12px] text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] transition-all duration-300 tracking-wider font-medium"
          placeholder="DISCOVER ARTIFACTS..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />

        {term && (
          <button 
            onClick={() => setTerm("")}
            className="absolute right-4 text-slate-500 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* --- Suggestions Dropdown --- */}
      <AnimatePresence>
        {term.length > 0 && suggestions.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 w-full mt-3 bg-[#0d1117]/95 backdrop-blur-2xl border border-white/10 rounded-2xl z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="px-4 py-2 border-b border-white/5 bg-white/[0.02]">
              <span className="text-[9px] font-black tracking-[0.2em] text-slate-500 uppercase flex items-center gap-2">
                <Zap size={10} className="text-emerald-500" /> Matches Found
              </span>
            </div>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {suggestions.map((item) => (
                <div
                  key={item._id}
                  onClick={() => {
                    navigate(`/products/${item._id}`);
                    setTerm("");
                  }}
                  className="flex items-center gap-4 p-3 hover:bg-white/[0.05] cursor-pointer transition-colors border-b border-white/[0.03] last:border-0 group/item"
                >
                  <div className="w-12 h-12 bg-white/[0.03] rounded-lg overflow-hidden border border-white/5 p-1">
                    <img 
                      src={item.images[0]?.url} 
                      className="w-full h-full object-contain group-hover/item:scale-110 transition-transform duration-500" 
                      alt={item.title} 
                    />
                  </div>
                  
                  <div className="flex flex-col flex-1">
                    <span className="text-[11px] font-bold text-slate-200 group-hover/item:text-emerald-400 transition-colors uppercase tracking-tight">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-500/80 mt-0.5">
                      {item.price?.amount} <span className="text-[8px] text-slate-600 italic">In Stock</span>
                    </span>
                  </div>
                  
                  <Search size={12} className="text-slate-700 group-hover/item:text-white transition-all mr-2" />
                </div>
              ))}
            </div>

            <div 
              className="p-3 bg-cyan-500/5 text-center cursor-pointer hover:bg-cyan-500/10 transition-colors"
              onClick={() => {
                // Future: Navigate to a full search results page
                setTerm("");
              }}
            >
              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">View All Results</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
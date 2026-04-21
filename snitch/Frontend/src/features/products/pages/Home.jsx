import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../Hook/useProduct";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../cart/Hook/userCart";
import { ShoppingBag, ArrowUpRight, Sparkles } from "lucide-react";
import Nav from "../components/nav";


const Home = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.products);
  const { handleGetAllProducts } = useProduct();
  const { handleAddToCart } = useCart();

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <div className="min-h-screen bg-[#030508] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* --- Ambient Background --- */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/5 blur-[150px] rounded-full -z-10 animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[150px] rounded-full -z-10" />

<Nav/>

      {/* --- Hero Section --- */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Sparkles size={12} className="text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-100">Drop 001 / Cyber-Minimalism</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-[10rem] font-black mb-6 tracking-tighter text-white leading-none mix-blend-difference"
          >
            RAW<span className="text-transparent stroke-text italic">STYLE.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 max-w-2xl mx-auto text-sm md:text-lg uppercase tracking-[0.4em] font-light italic"
          >
            Precision engineered garments for the digital vanguard.
          </motion.p>
        </div>
      </header>

      {/* --- Collection Filter/Info --- */}
      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4 border-b border-white/5 pb-8">
          <div className="flex items-center gap-4">
             <div className="h-[1px] w-12 bg-emerald-500" />
             <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-white">The Collection</h3>
          </div>
          <div className="flex items-center gap-8 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
            <span>Availability: {products?.length || 0} Ships</span>
            <span className="text-emerald-500">Filters: [ All Assets ]</span>
          </div>
        </div>

        {/* --- Product Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {products && products.length > 0 ? (
            products.map((item, index) => (
              <motion.div 
                key={item._id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
                className="group relative"
              >
                {/* Product Card Container */}
                <div className="relative aspect-[3/4] bg-[#080a0f] rounded-[2.5rem] overflow-hidden border border-white/5 transition-all duration-700 hover:border-cyan-500/20 shadow-2xl">
                  
                  {/* Hover Overlay Buttons */}
                  <div className="absolute inset-0 z-20 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(item._id)}
                      className="w-40 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={14} /> Quick Add
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/products/${item._id}`)}
                      className="w-40 py-4 bg-transparent border border-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-all"
                    >
                      View Detail
                    </motion.button>
                    <motion.button 
                    
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate("/checkout")}
                      className="w-40 py-4 bg-transparent border border-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-all"
                    >
                      By Now
                    </motion.button>
                  </div>

                  {/* Image Holder */}
                  <div className="h-full w-full p-8 group-hover:scale-105 transition-transform duration-1000">
                    <img 
                      src={item.images?.[0]?.url || "https://via.placeholder.com/400"}
                      alt={item.title}
                      className="h-full w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    />
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                    <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                       <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">₹{item.price.amount}</p>
                    </div>
                    {item.variants?.length > 0 && (
                      <div className="w-8 h-8 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-[9px] font-bold text-white">
                        +{item.variants.length}
                      </div>
                    )}
                  </div>
                </div>

                {/* Info Text (Outside Card for "High-End" look) */}
                <div className="mt-6 px-2">
                  <div className="flex justify-between items-start">
                    <div>
                       <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-white group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[9px] text-slate-500 uppercase mt-1 tracking-widest font-mono">Series-1 // Artifact</p>
                    </div>
                    <ArrowUpRight size={16} className="text-slate-600 group-hover:text-white transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  
                  {/* Variant Preview Dots */}
                  <div className="flex gap-2 mt-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-cyan-500/10" />
                    {item.variants?.slice(0, 3).map((_, i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-white/10 hover:bg-white/30 transition-all cursor-pointer" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-40 flex flex-col items-center">
              <div className="relative w-16 h-16 mb-8">
                 <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full" />
                 <div className="absolute inset-0 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 animate-pulse">Syncing Inventory...</p>
            </div>
          )}
        </div>
      </main>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
        }
        @media (min-width: 768px) {
          .stroke-text {
            -webkit-text-stroke: 2px rgba(255,255,255,0.2);
          }
        }
        .group:hover .stroke-text {
          -webkit-text-stroke: 2px #06b6d4;
          transition: all 0.5s ease;
        }
      `}</style>
    </div>
  );
};

export default Home;
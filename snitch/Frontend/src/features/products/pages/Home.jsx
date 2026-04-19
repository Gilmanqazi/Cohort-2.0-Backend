import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../Hook/useProduct";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.products);
  const cart = useSelector((state) => state.product.addToCard);
  const count = cart?.cart?.items?.length || 0;
  const { handleGetAllProducts, handleAddToCart } = useProduct();

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  // Animation Config
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* --- Floating Ambient Glows --- */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full -z-10" />

      {/* --- Modern Navbar --- */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#05070a]/80 border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center font-black text-black">L</div>
            <h1 className="text-xl font-black tracking-tighter text-white">LUXE<span className="text-cyan-500">.</span></h1>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-6 text-[11px] uppercase tracking-widest font-bold text-slate-400">
              <span className="hover:text-white cursor-pointer transition">Home</span>
              <span className="hover:text-white cursor-pointer transition">Store</span>
            </div>
            
            <div className="relative group cursor-pointer" onClick={() => navigate("/addToCart")}>
              <div className="p-2 group-hover:bg-white/5 rounded-full transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </div>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-black text-[10px] font-black h-4 w-4 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                  {count}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header className="py-20 px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl md:text-8xl font-black mb-4 tracking-tighter text-white leading-none"
        >
          RAW <span className="text-cyan-500 italic">STYLE.</span>
        </motion.h2>
        <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base uppercase tracking-[0.2em] font-medium">
          Premium Artifacts for the Modern Era
        </p>
      </header>

      {/* --- Product Grid --- */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex justify-between items-end mb-12">
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 border-l-2 border-cyan-500 pl-4">
            New Drops
          </h3>
          <span className="text-[10px] font-mono text-slate-600 uppercase">Vault: {products?.length || 0} Items</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products && products.length > 0 ? (
            products.map((item, index) => (
              console.log(item.varients,"ITEMM"),
              <motion.div 
                key={item._id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                varients={cardVariants}
                className="group"
              >
                <div className="relative bg-[#0d1117] border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-cyan-500/30 group-hover:-translate-y-2 shadow-2xl">
                  
                  {/* Variant Count Badge */}
                  {item.varients?.length > 0 && (
                    <div className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-md border border-white/10 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest text-white">
                      {item.varients.length + 1} Styles
                    </div>
                  )}

                  {/* Product Image */}
                  <div 
                    onClick={() => navigate(`/products/${item._id}`)}
                    className="aspect-[4/5] bg-[#161b22] overflow-hidden cursor-pointer p-4"
                  >
                    <img 
                      src={item.images?.[0]?.url || "https://via.placeholder.com/400"}
                      alt={item.title}
                      className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-200 truncate pr-2">
                        {item.title}
                      </h4>
                      <span className="text-xs font-mono font-bold text-cyan-400">
                        ₹{item.price.amount}
                      </span>
                    </div>

                    {/* Variant Mini Circles */}
                    <div className="flex gap-1.5 mt-3 mb-6">
                      <div className="w-4 h-4 rounded-full border border-cyan-500 p-[1px]">
                         <div className="w-full h-full bg-slate-700 rounded-full overflow-hidden">
                            <img src={item.images?.[0]?.url} className="object-cover h-full" />
                         </div>
                      </div>
                      {item.varients?.slice(0, 3).map((v, i) => (
                        <div key={i} className="w-4 h-4 rounded-full border border-white/10 p-[1px] hover:border-white/40 transition">
                           <div className="w-full h-full bg-slate-800 rounded-full overflow-hidden">
                              <img src={v.images?.[0] || item.images?.[0]?.url} className="object-cover h-full" />
                           </div>
                        </div>
                      ))}
                      {item.varients ?.length > 3 && <span className="text-[8px] text-slate-600">+{item.varients.length - 3}</span>}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleAddToCart(item._id)}
                        className="flex-1 py-3 bg-white/[0.03] hover:bg-white/10 border border-white/5 text-[9px] font-black uppercase tracking-widest transition-all rounded-xl active:scale-95"
                      >
                        Add
                      </button>
                      <button 
                        onClick={() => navigate(`/products/${item._id}`)}
                        className="flex-[2] py-3 bg-cyan-600 hover:bg-cyan-500 text-black text-[9px] font-black uppercase tracking-widest transition-all rounded-xl shadow-lg shadow-cyan-900/20 active:scale-95"
                      > 
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-40 text-center">
              <div className="inline-block w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600">Syncing with Inventory...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
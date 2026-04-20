import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Ghost } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center px-6 overflow-hidden relative">
      
      {/* --- Aesthetic Background Elements --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full -z-10" />

      <div className="max-w-2xl w-full text-center">
        {/* --- Animated Glitch Number --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative inline-block"
        >
          <h1 className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-white/5 select-none">
            404
          </h1>
          <motion.div 
            animate={{ 
              x: [0, -2, 2, -2, 0],
              opacity: [1, 0.8, 1, 0.5, 1]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Ghost size={80} className="text-emerald-500 animate-bounce" strokeWidth={1} />
          </motion.div>
        </motion.div>

        {/* --- Text Content --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="-mt-10 md:-mt-20 relative z-10"
        >
          <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-[0.2em] mb-4">
            Lost in the <span className="text-emerald-500">Void.</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-mono mb-12 max-w-md mx-auto leading-relaxed">
            The artifact you are looking for has been de-manifested or moved to a restricted sector.
          </p>

          {/* --- Action Buttons --- */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-white transition-all w-full sm:w-auto"
            >
              <ArrowLeft size={14} /> Go Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-8 py-4 bg-emerald-600 text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-[0_0_30px_rgba(8,145,178,0.3)] w-full sm:w-auto"
            >
              <Home size={14} /> Return to Base
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* --- Footer Tag --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <p className="text-[10px] font-mono text-slate-700 tracking-[0.5em] uppercase">
          Voguenr // Protocol 404
        </p>
      </div>
    </div>
  );
};

export default NotFound;
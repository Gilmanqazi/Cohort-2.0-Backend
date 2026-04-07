import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, LayoutGrid, Zap } from 'lucide-react';
import { useAI } from '../hooks/useAi';
import { Sidebar } from '../components/Sidebar';
import ChatInput from '../components/ChatInput';


// --- PURANA BATTLE CARD LOOK (JO AAPNE PASAND KIYA THA) ---
const ModelCard = ({ title, score, content, color, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col bg-[#19191e]/60 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl h-full"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <img src={image} alt="model visual" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-3 left-4 text-white font-bold text-lg uppercase italic tracking-tighter">
          {title}
        </div>
      </div>

      <div className="p-5 border-b border-white/5 bg-[#1e1e24]/80">
        <div className="flex justify-between items-center mb-3">
          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter`} style={{ backgroundColor: `${color}20`, color }}>
            Performance
          </span>
          <span className="font-mono text-xl font-bold" style={{ color }}>{score}/10</span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score * 10}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>

      <div className="p-6 text-sm leading-relaxed text-white/70 prose prose-invert max-w-none overflow-y-auto max-h-[350px] custom-scrollbar">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </motion.div>
  );
};

const AIChatBattle = () => {
  const { problem, loading } = useAI();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-[#0e0e12] text-[#fcf8fe] overflow-hidden font-sans">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      <main className="flex-1 flex flex-col relative items-center bg-[radial-gradient(circle_at_50%_0%,_#1c1e24_0%,_#0e0e12_100%)]">
        
        {/* Header (Yuddh AI Style) */}
        <header className="w-full p-6 flex justify-between items-center z-30">
          <div className="flex items-center gap-4">
             <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 hover:bg-white/5 rounded-full transition-colors">
               <Menu size={20} />
             </button>
             <div className="flex items-center gap-2">
               <div className="w-6 h-6 bg-white rounded flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                 <Zap size={14} className="text-black fill-black" />
               </div>
               <span className="font-bold tracking-tighter text-sm uppercase italic">Yuddh AI Battle</span>
             </div>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">Neural Link Active</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="w-full max-w-6xl flex-1 overflow-y-auto custom-scrollbar px-6 pt-4 pb-32">
          {!problem && !loading && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-[60vh] flex flex-col items-center justify-center text-center"
            >
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic mb-2">
                Ready for <span className="text-[#7c7cff]">Combat?</span>
              </h2>
              <p className="text-white/40 font-medium tracking-widest text-xs uppercase">Describe a challenge to begin the evaluation</p>
            </motion.div>
          )}

          {problem && (
            <div className="space-y-10 animate-in fade-in duration-700">
              {/* Battle Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
                {/* VS Badge */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white text-black font-black w-12 h-12 rounded-xl rotate-45 items-center justify-center border-4 border-[#0e0e12] shadow-2xl">
                  <span className="-rotate-45">VS</span>
                </div>

                <ModelCard 
                  title="Model Alpha" 
                  score={problem.judge.solution_1_score} 
                  content={problem.solution_1} 
                  color="#7c7cff" 
                  image="https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=400"
                />
                <ModelCard 
                  title="Model Beta" 
                  score={problem.judge.solution_2_score} 
                  content={problem.solution_2} 
                  color="#ff6aa2" 
                  image="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400"
                />
              </div>

              {/* Final Verdict Section (The Judge) */}
              <div className="bg-[#1a1a24]/60 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-2xl shadow-2xl">
                <div className="p-6 border-b border-white/5 bg-yellow-500/5 flex items-center gap-3">
                  <span className="text-xl">⚖️</span>
                  <h3 className="text-yellow-500 font-black uppercase tracking-[.2em] text-xs">Judge's Final Reasoning</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
                  <div className="p-8 text-xs text-white leading-relaxed bold">
                    <ReactMarkdown>{problem.judge.solution_1_reasoning}</ReactMarkdown>
                  </div>
                  <div className="p-8 text-xs text-white leading-relaxed bold">
                    <ReactMarkdown>{problem.judge.solution_2_reasoning}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Input Area (Yuddh AI Style) */}
        <div className="absolute bottom-0 w-full max-w-4xl px-6 pb-8 bg-gradient-to-t from-[#0e0e12] via-[#0e0e12] to-transparent">
          <ChatInput />
          <p className="text-[9px] text-center mt-4 text-white/20 tracking-widest uppercase font-bold">
            Powered by Yuddh AI Neural Engine
          </p>
        </div>
      </main>
    </div>
  );
};

export default AIChatBattle;
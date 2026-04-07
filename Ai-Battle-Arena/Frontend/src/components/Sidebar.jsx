import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageSquare, Trash2, X, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAI } from '../hooks/useAi';
import { useAuth } from '../auth/hooks/useAuth';
import LoadingAnim from '../pages/LoadingAnim';
import { LogOut } from 'lucide-react';

export const Sidebar = ({ isOpen, toggleSidebar  }) => {
  const navigate = useNavigate();
  const { history, fetchAndSetHistory, removeChatFromHistroy, loadChat, setProblem } = useAI();

const {user,loading,handleLogOut} = useAuth()



  useEffect(() => {
    fetchAndSetHistory();
  }, []);

  const handleNewChat = () => {
    navigate('/');
    setProblem("");
    if (window.innerWidth < 768) toggleSidebar();
  };

  const openChat = (id) => {
    loadChat(id);
    if (window.innerWidth < 768) toggleSidebar();
  };
  if(loading){
    <LoadingAnim/>
  }

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`
        fixed md:relative z-50 h-full w-72 bg-[#14141a]/95 backdrop-blur-2xl border-r border-white/5 
        flex flex-col p-4 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center justify-between gap-2 mb-6 md:justify-center">
        <div className="w-6 h-6 bg-white rounded flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                         <Zap size={14} className="text-black fill-black" />
                       </div>
          <span className="font-bold tracking-tighter text-sm uppercase italic">Yuddh AI Battle</span>
          
          <button onClick={toggleSidebar} className="md:hidden text-white/50 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNewChat}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold mb-6 transition-all"
        >
          <Plus size={16} /> New Battle
        </motion.button>

        <div className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-2">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-4 px-2">History</p>
          {history.map((item,idx) => (
            <motion.div
              key={idx}
              onClick={() => openChat(item._id)}
              className="group flex items-center gap-3 px-3 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer transition-all border border-transparent hover:border-white/5"
            >
              <MessageSquare size={14} className="shrink-0 opacity-40 group-hover:opacity-100" />
              <span className="flex-1 truncate font-medium">{item.title || item.problem}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm("Delete this chat?")) removeChatFromHistroy(item._id);
                }}
                className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-500 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="pt-4 border-t border-white/5 mt-4">
          <div className="flex items-center gap-3 px-2 py-2 bg-white/5 rounded-2xl">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7c7cff] to-[#ff6aa2]" />
            <div className="overflow-hidden">
              <p className="text-xs font-semibold truncate text-white/90">{user.username}</p>
              <p className="text-[10px] text-green-400 font-mono uppercase">Online</p>
              <button
              onClick={handleLogOut}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 px-2 py-2 text-sm font-medium text-red-500 transition-all hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] disabled:opacity-50"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
              ) : (
                <>
                  <LogOut size={16} />
                  <span>Logout</span>
                </>
              )}
            </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
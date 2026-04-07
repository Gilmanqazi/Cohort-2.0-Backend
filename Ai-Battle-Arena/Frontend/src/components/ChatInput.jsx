import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Globe, Paperclip, Mic, LayoutGrid } from 'lucide-react';
import { useAI } from '../hooks/useAi';


const ChatInput = () => {
  const textareaRef = useRef(null);
  const { handleGraph, loading } = useAI();

  const submit = async () => {
    const val = textareaRef.current?.value.trim();
    if (!val || loading) return;
    await handleGraph(val);
    textareaRef.current.value = '';
  };

  return (
    <div className="relative group">
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-white/5 blur-xl rounded-[2rem] group-focus-within:bg-white/10 transition-all duration-500" />
      
      <div className="relative bg-[#1d1e22] border border-white/10 rounded-[1.5rem] p-3 shadow-2xl flex items-center gap-2">
        {/* Left Icons */}
        <div className="flex items-center gap-1 pl-2 pr-2 border-r border-white/5">
          <button className="p-2 text-white/40 hover:text-white transition-colors">
            <Paperclip size={18} />
          </button>
          <button className="p-2 text-white/40 hover:text-white transition-colors">
            <Globe size={18} />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          rows={1}
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent border-none outline-none text-white text-sm py-2 px-2 resize-none placeholder:text-white/20"
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), submit())}
        />

        {/* Right Icons */}
        <div className="flex items-center gap-2 pr-2">
           <button className="p-2 text-white/40 hover:text-white">
             <Mic size={18} />
           </button>
           <button 
            onClick={submit}
            className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all shadow-lg shadow-white/5"
           >
             {loading ? (
               <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
             ) : (
               <LayoutGrid size={18} />
             )}
           </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
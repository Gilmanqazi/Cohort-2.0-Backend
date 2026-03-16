import React, { useState } from 'react';
import { 
  FiMenu, FiPlus, FiMessageSquare, FiSearch, 
  FiUser, FiSettings, FiSend, FiTrash2, FiX, FiZap 
} from 'react-icons/fi';

const ChatUI = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [input, setInput] = useState("");
  const [currentChatId, setCurrentChatId] = useState(1); // Track active chat
  
  // Dummy History Data - In a real app, this comes from API
  const chatHistory = [
    { id: 1, title: "Deep Dive into Gnosis Protocol", date: "Just Now", description: "Exploring decentralized communication protocols." },
    { id: 2, title: "Frontend Performance in React", date: "5m ago", description: "Tips and tricks for optimizing React apps." },
    { id: 3, title: "The Rise of Specialized AI Models", date: "Yesterday", description: "Comparison of niche-specific LLMs." },
    { id: 4, title: "MERN Stack v3: Key Changes", date: "Yesterday", description: "Discussing recent updates in the MERN ecosystem." },
  ];

  const suggestedPrompts = [
    { text: "What are Gnosis Protocols?", description: "Learn about the core communication system." },
    { text: "How to optimize React apps?", description: "Get actionable performance tips." },
    { text: "Analyze 2026 tech trends.", description: "Explore upcoming technology shifts." },
    { text: "Best practices for API design.", description: "Learn to build robust and scalable APIs." }
  ];

  return (
    <div className="flex h-screen bg-[#080a10] text-gray-300 font-sans overflow-hidden">
      
      {/* --- SIDEBAR (History & Controls) --- */}
      <aside className={`
        ${isSidebarOpen ? 'w-80' : 'w-0'} 
        fixed md:relative z-50 h-full bg-[#0c0f16] border-r border-white/[0.03]
        transition-all duration-300 ease-in-out overflow-hidden flex flex-col
      `}>
        {/* Header with New Chat */}
        <div className="p-5 flex items-center justify-between border-b border-white/[0.03]">
          <div className="flex items-center gap-2">
            <FiZap className="text-blue-400 text-xl" />
            <h1 className="text-xl font-bold text-white tracking-tight">Gnosis</h1>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-all">
            <FiPlus />
          </button>
        </div>

        {/* New Chat Button (Prominent) */}
        <div className="p-4">
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl transition-all font-medium shadow-md shadow-blue-500/10">
            <FiMessageSquare /> <span>Start New Session</span>
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto px-4 space-y-2 custom-scrollbar">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-600 font-bold p-3 mt-1">Intelligence Stream</p>
          {chatHistory.map((chat) => (
            <div 
              key={chat.id} 
              onClick={() => setCurrentChatId(chat.id)}
              className={`group flex items-center gap-3.5 p-3.5 rounded-xl cursor-pointer transition-all ${currentChatId === chat.id ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}
            >
              <div className={`p-1.5 rounded-lg ${currentChatId === chat.id ? 'bg-blue-500/10' : 'bg-white/[0.02]'}`}>
                <FiMessageSquare className={`${currentChatId === chat.id ? 'text-blue-400' : 'text-gray-600'} group-hover:text-blue-400 shrink-0 text-sm`} />
              </div>
              <div className="flex-1 overflow-hidden">
                <span className="text-sm text-gray-200 truncate block font-medium group-hover:text-white">{chat.title}</span>
                <span className="text-[11px] text-gray-500 block font-light truncate">{chat.description}</span>
              </div>
              <FiTrash2 className="text-gray-700 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all text-xs shrink-0" />
            </div>
          ))}
        </div>

        {/* User Profile / Bottom Controls */}
        <div className="p-4 border-t border-white/[0.03] space-y-3 bg-[#0c0f16]">
          <div className="flex items-center justify-between text-gray-500 px-1">
            <span className="text-[11px] uppercase tracking-widest">Network Status</span>
            <span className="text-[11px] text-green-400 font-medium">Synced</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#11141c] rounded-xl border border-white/[0.02] shadow-inner">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/10">JD</div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">John Doe</p>
              <p className="text-[11px] text-blue-400 uppercase tracking-tighter">Premium Access</p>
            </div>
            <button className="p-1.5 text-gray-600 hover:text-white rounded-lg transition-all">
                <FiSettings size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CHAT AREA --- */}
      <main className="flex-1 flex flex-col relative min-w-0">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-white/[0.03] bg-[#080a10]">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2.5 hover:bg-white/5 rounded-lg text-white">
            <FiMenu size={20} />
          </button>
          <div className="flex items-center gap-1.5">
            <FiZap className="text-blue-400 text-lg" />
            <h1 className="text-lg font-bold text-white tracking-tighter">Gnosis</h1>
          </div>
          <button className="p-2.5 hover:bg-white/5 rounded-lg text-white">
            <FiPlus size={20} />
          </button>
        </header>

        {/* Close Overlay for Mobile Sidebar */}
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)} 
            className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-md z-40 transition-opacity"
          ></div>
        )}

        {/* Chat Messages Placeholder */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-10 flex flex-col items-center custom-scrollbar">
          
          {/* Default State / Welcome Screen - Modernized */}
          <div className="max-w-3xl w-full text-center mt-12 md:mt-24 space-y-12">
            <div className="inline-flex flex-col items-center">
                <div className="w-20 h-20 rounded-3xl bg-[#0c0f16] border border-white/[0.03] flex items-center justify-center shadow-xl shadow-black/30 mb-6">
                    <FiZap className="text-blue-500 text-5xl" />
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter leading-tight">
                    Start Your <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Intelligence</span>
                    <br />Query with Gnosis.
                </h2>
                <p className="text-gray-500 text-base mt-3 max-w-lg mx-auto font-light">
                    Ask complex questions, generate content, analyze data, or simply converse. Gnosis is here to enhance your productivity.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {suggestedPrompts.map((item, i) => (
                <button key={i} className="group p-5 bg-[#0c0f16] border border-white/[0.03] rounded-2xl hover:border-blue-500/30 hover:bg-white/[0.01] transition-all flex flex-col gap-1.5 shadow-lg shadow-black/10">
                  <span className="text-sm text-gray-100 group-hover:text-blue-400 transition-colors font-semibold tracking-tight">{item.text}</span>
                  <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors font-light leading-relaxed">{item.description}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Area (Centered & Floating) */}
        <div className="p-4 md:p-8 md:pb-10 bg-gradient-to-t from-[#080a10] via-[#080a10] to-transparent">
          <div className="max-w-3xl mx-auto relative">
            <div className="relative bg-[#0c0f16] border border-white/[0.03] rounded-[2rem] flex items-center p-2.5 shadow-2xl shadow-black/40">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Gnosis anything..."
                className="flex-1 bg-transparent border-none outline-none px-5 py-3.5 text-white placeholder-gray-600 text-base"
              />
              <button className="bg-white text-black p-4 rounded-full hover:bg-blue-500 hover:text-white transition-all transform active:scale-95 shadow-lg">
                <FiSend size={18} />
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-700 mt-5 uppercase tracking-[0.2em] font-medium">
            Gnosis Core v1.2 • Precision Intelligence Engine
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatUI;
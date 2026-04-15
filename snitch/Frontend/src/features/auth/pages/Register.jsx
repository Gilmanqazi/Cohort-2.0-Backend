import React, { useState } from 'react';
import { useAuth } from '../hook/useAuth';
import { FcGoogle } from 'react-icons/fc'; 
import modelRegister from "../../../assets/Model-Snitch-Register.jpeg"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

const Register = () => {

  const navigate = useNavigate()

  const { handleRegister } = useAuth(); 

  const [fullname, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSeller, setIsSeller] = useState(false);

  const handleSubmit = async (e) => {
try {
  e.preventDefault();
  await handleRegister({ fullname, contact, email, password, isSeller });
toast.success("Registration Successfull")
  navigate("/")
} catch (error) {
 console.log(error) 
}
    
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#050505] text-white font-sans antialiased p-0 md:p-6">
      <div className="w-full h-screen md:h-auto md:max-w-6xl flex flex-col md:flex-row bg-[#0A0A0A] md:rounded-2xl overflow-hidden shadow-2xl relative border-none md:border md:border-white/10">
        
        {/* IMAGE SECTION */}
        <div className="absolute inset-0 md:relative md:w-1/2 h-full overflow-hidden">
          <img 
            src={modelRegister} 
            alt="Fashion Model" 
            className="w-full h-full object-cover grayscale opacity-50 md:opacity-80 transition-all duration-1000 hover:scale-105 hover:grayscale-0"
          />
          <div className="absolute top-8 left-8 z-20">
          <h1 className="text-2xl font-extralight tracking-[0.5em] uppercase border-b border-white/30 pb-2">
              VOGUE<span className="font-bold">NR</span>
            </h1>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:hidden"></div>
        </div>

        {/* FORM SECTION */}
        <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12 md:px-16 py-12 bg-black/40 backdrop-blur-md md:bg-[#0A0A0A] md:backdrop-blur-none overflow-y-auto">
          
          <div className="w-full max-w-md">
            <header className="mb-8 text-center md:text-left">
              <h2 className="text-3xl font-light tracking-tight text-white mb-2">Create Account</h2>
              <p className="text-zinc-400 text-[10px] tracking-[0.2em] uppercase">Join the elite fashion collective</p>
            </header>

            {/* Google Button Added Here */}
         <a href="/api/auth/google"> <button 
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-transparent border border-zinc-800 py-3 mb-6 hover:bg-white/5 hover:scale-95 transition-all duration-300 group"
            >
              <FcGoogle className="text-xl" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Continue with Google</span>
            </button></a>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] bg-zinc-800 flex-1"></div>
              <span className="text-[9px] text-zinc-600 uppercase tracking-widest">OR</span>
              <div className="h-[1px] bg-zinc-800 flex-1"></div>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5" onSubmit={handleSubmit}>
              
              {/* Full Name */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Full Name</label>
                <input 
                  type="text"
                  value={fullname}
                  onChange={(e)=>setFullName(e.target.value)}
                  required
                  className="w-full bg-white/5 border-b border-zinc-800 py-3 px-1 focus:outline-none focus:border-white transition-all placeholder:text-zinc-800 text-sm"
                  placeholder="Alexander Vogue"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Email</label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border-b border-zinc-800 py-3 px-1 focus:outline-none focus:border-white transition-all placeholder:text-zinc-800 text-sm"
                  placeholder="email@studio.com"
                />
              </div>

              {/* Contact */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Contact</label>
                <input 
                  type="text"
                  value={contact}
                  onChange={(e)=>setContact(e.target.value)}
                  required
                  className="w-full bg-white/5 border-b border-zinc-800 py-3 px-1 focus:outline-none focus:border-white transition-all placeholder:text-zinc-800 text-sm"
                  placeholder="+00 123 456"
                />
              </div>

              {/* Password */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Access Key</label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                  className="w-full bg-white/5 border-b border-zinc-800 py-3 px-1 focus:outline-none focus:border-white transition-all placeholder:text-zinc-800 text-sm"
                  placeholder="••••••••••••"
                />
              </div>

              {/* Role Selection */}
              <div className="md:col-span-2 py-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold block mb-3">Register as:</label>
                <div className="flex gap-8 justify-center md:justify-start">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      checked={isSeller === false}
                      onChange={()=>setIsSeller(false)}
                      className="w-3 h-3 accent-white" 
                    />
                    <span className={`text-[11px] tracking-widest uppercase transition-colors ${!isSeller ? 'text-white' : 'text-zinc-500 hover:text-white'}`}>Buyer</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      checked={isSeller === true}
                      onChange={()=>setIsSeller(true)}
                      className="w-3 h-3 accent-white" 
                    />
                    <span className={`text-[11px] tracking-widest uppercase transition-colors ${isSeller ? 'text-white' : 'text-zinc-500 hover:text-white'}`}>Seller</span>
                  </label>
                </div>
              </div>

              {/* Action Button */}
              <div className="md:col-span-2 pt-4">
                <button 
                  type="submit"
                  className="w-full bg-white text-black py-4 uppercase text-[11px] tracking-[0.5em] font-black hover:bg-zinc-200 active:scale-95 transition-all duration-300 shadow-xl"
                >
                  Create Account
                </button>
                <footer className="mt-8 text-center">
                  <p className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase">
                    Already a member? <a href="/login" className="text-white border-b border-white/30 hover:border-white transition-colors">Log In</a>
                  </p>
                </footer>
              </div>

            </form>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Register;
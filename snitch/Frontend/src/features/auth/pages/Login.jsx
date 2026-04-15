import React from 'react';
import { useAuth } from '../hook/useAuth';
import { useForm } from "react-hook-form";
import { FcGoogle } from 'react-icons/fc';
import modelLogin from "../../../assets/Model-Snitch-Login.jpeg"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const navigate = useNavigate()
  const { handleLogin } = useAuth();
  const { register, reset, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    await handleLogin(data);
    reset();
   toast.success("Login Successfull")
     navigate("/")
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#050505] text-white font-sans antialiased p-0 md:p-6">
      
      {/* Main Container: Responsive Width & Height */}
      <div className="w-full h-screen md:h-auto md:max-w-5xl flex flex-col md:flex-row bg-[#111] md:rounded-2xl overflow-hidden shadow-2xl relative border-none md:border md:border-white/10">
        
        {/* IMAGE SECTION: Becomes the background on mobile, side-panel on desktop */}
        <div className="absolute inset-0 md:relative md:w-1/2 h-full overflow-hidden">
          <img 
            src={modelLogin} 
            alt="Fashion Editorial" 
            className="w-full h-full object-cover grayscale opacity-60 md:opacity-80 transition-all duration-1000 hover:scale-110 hover:grayscale-0"
          />
          {/* Brand Overlay for Mobile/Desktop */}
          <div className="absolute top-8 left-8 z-20">
            <h1 className="text-2xl font-extralight tracking-[0.5em] uppercase border-b border-white/30 pb-2">
              VOGUE<span className="font-bold">NR</span>
            </h1>
          </div>
          {/* Gradient to darken image for text readability on mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent md:hidden"></div>
        </div>

        {/* FORM SECTION: Glassmorphism on mobile, Solid on desktop */}
        <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12 md:px-16 py-12 bg-black/40 backdrop-blur-md md:bg-[#0A0A0A] md:backdrop-blur-none">
          
          <div className="w-full max-w-sm">
            <header className="mb-10 text-center md:text-left">
              <h2 className="text-3xl font-light tracking-tight text-white mb-2">Member Login</h2>
              <p className="text-zinc-400 text-sm tracking-wide">Enter your credentials to access your studio.</p>
            </header>

            <a href="/api/auth/google"> <button 
                          type="button"
                          className="w-full flex items-center justify-center gap-3 bg-transparent border border-zinc-800 py-3 mb-6 hover:bg-white/5 hover:scale-95 transition-all duration-300 group"
                        >
                          <FcGoogle className="text-xl" />
                          <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Continue with Google</span>
                        </button></a>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Identity</label>
                <input 
                  {...register("email", { required: "Email is required" })} 
                  className={`w-full bg-white/5 border-b ${errors.email ? 'border-red-500' : 'border-zinc-800'} py-3 px-1 focus:outline-none focus:border-white transition-all placeholder:text-zinc-700`}
                  type="email" 
                  placeholder="email@studio.com" 
                />
                {errors.email && <p className="text-red-500 text-[10px] uppercase mt-1">{errors.email.message}</p>}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Access Key</label>
                  <button type="button" className="text-[10px] uppercase text-zinc-600 hover:text-white transition-colors">Recover</button>
                </div>
                <input 
                  {...register("password", { 
                    required: "Password required", 
                    minLength: { value: 6, message: "Security too weak" } 
                  })} 
                  className={`w-full bg-white/5 border-b ${errors.password ? 'border-red-500' : 'border-zinc-800'} py-3 px-1 focus:outline-none focus:border-white transition-all placeholder:text-zinc-700`}
                  type="password" 
                  placeholder="••••••••" 
                />
                {errors.password && <p className="text-red-500 text-[10px] uppercase mt-1">{errors.password.message}</p>}
              </div>

              {/* Action Button */}
              <button className="w-full bg-white text-black py-4 mt-4 uppercase text-[11px] tracking-[0.4em] font-black hover:bg-zinc-200 active:scale-95 transition-all duration-300">
                Sign In
              </button>

              <footer className="pt-8 text-center">
                <p className="text-xs text-zinc-500 tracking-widest">
                  Not a member? <a href="#" className="text-white hover:underline underline-offset-8">Join the Club</a>
                </p>
                
              </footer>
            </form>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
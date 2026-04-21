import React from 'react';
import { useAuth } from '../hook/useAuth';
import { useForm } from "react-hook-form";
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import modelLogin from "../../../assets/Model-Snitch-Login.jpeg";
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const { register, reset, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const user = await handleLogin(data);
    if (user) {
      reset();
      user.role === "buyer" ? navigate("/") : navigate("/getProducts");
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#050505] text-white font-sans antialiased overflow-hidden relative">
      

      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-600/10 blur-[150px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full h-full sm:h-[650px] sm:max-w-6xl flex bg-[#0A0A0A]/80 backdrop-blur-3xl sm:rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] border-none sm:border sm:border-white/5 z-10"
      >
        
  
       
<div className="hidden md:block md:w-1/2 h-full overflow-hidden relative border-r border-white/5">
  <img 
    src={modelLogin} 
    alt="Fashion Login" 
  
    className="w-full h-full object-cover object-top grayscale hover:grayscale-0 opacity-80 hover:scale-105 transition-transform duration-1000"
  />
  <div className="absolute top-8 left-8 z-30">
  <h1 className="text-2xl font-black tracking-[0.5em] uppercase border-b border-white/20 pb-2">
              VOGUE<span className="text-emerald-500">NR</span>
            </h1>
  </div>
</div>

       
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 sm:px-20 relative">
          <div className="w-full max-w-md">
            
           
            <div className="lg:hidden text-center mb-10">
               <h1 className="text-2xl font-black tracking-[0.4em] uppercase text-white">
                VOGUE<span className="text-emerald-500">NR</span>
              </h1>
            </div>

            <header className="mb-10 text-center lg:text-left">
              <h2 className="text-4xl font-black tracking-tighter text-white mb-2">AUTH_SYSTEM</h2>
              <p className="text-slate-500 text-[11px] uppercase tracking-[0.2em] font-medium">Verify credentials for secure entry</p>
            </header>

            {/* Google Login */}
            <a href="https://cohort-2-0-backend-16.onrender.com/api/auth/google">
              <motion.button 
                whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.05)" }}
                className="w-full flex items-center justify-center gap-4 bg-transparent border border-white/5 py-4 mb-10 rounded-xl transition-all"
              >
                <FcGoogle size={20} />
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-300">Sync with Google</span>
              </motion.button>
            </a>

            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="relative group">
                <label className="text-[9px] uppercase tracking-[0.4em] text-slate-500 font-black absolute -top-5 left-0">Identity</label>
                <input 
                  {...register("email", { required: "Required" })} 
                  className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-white/10 group-hover:border-white/30'} py-3 focus:outline-none focus:border-emerald-500 transition-all text-sm tracking-wide`}
                  type="email" 
                  placeholder="USER_ID@VOGUENR.COM" 
                />
              </div>

              {/* Password Field */}
              <div className="relative group pt-4">
                <label className="text-[9px] uppercase tracking-[0.4em] text-slate-500 font-black absolute top-0 left-0">Access Key</label>
                <input 
                  {...register("password", { required: "Required" })} 
                  className={`w-full bg-transparent border-b ${errors.password ? 'border-red-500' : 'border-white/10 group-hover:border-white/30'} py-3 focus:outline-none focus:border-emerald-500 transition-all text-sm tracking-wide`}
                  type="password" 
                  placeholder="••••••••" 
                />
              </div>

              {/* Action Button */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-black py-5 uppercase text-[11px] tracking-[0.5em] font-black hover:bg-emerald-400 transition-all rounded-xl shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
              >
                Access Account
              </motion.button>

              <footer className="pt-8 text-center lg:text-left flex justify-between items-center border-t border-white/5 mt-10">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                  No Key? <Link to="/register" className="text-white font-bold ml-2 hover:text-emerald-500 transition-colors underline-offset-4">Register</Link>
                </p>
                <Link to="/" className="text-[10px] text-slate-700 uppercase tracking-widest hover:text-white transition-all">Support</Link>
              </footer>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
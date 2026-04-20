import React from 'react';
import { useAuth } from '../hook/useAuth';
import { useForm } from "react-hook-form";
import { FcGoogle } from 'react-icons/fc'; 
import { motion } from 'framer-motion';
import modelRegister from "../../../assets/Model-Snitch-Register.jpeg"
import { useNavigate, Link } from "react-router-dom"

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister } = useAuth(); 


  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      isSeller: false 
    }
  });

  const onSubmit = async (data) => {
    try {

      await handleRegister(data);
      navigate("/");
    } catch (error) { 
      console.log("Registration Error:", error); 
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#050505] text-white font-sans antialiased overflow-hidden relative">
      
  
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full" />

  
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-full sm:h-[750px] sm:max-w-6xl flex bg-[#0A0A0A]/90 backdrop-blur-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl relative border-none sm:border sm:border-white/5 z-10"
      >
        
    
        <div className="hidden md:block md:w-5/12 h-full overflow-hidden relative border-r border-white/5">
          <img 
            src={modelRegister} 
            className="w-full h-full object-cover object-top grayscale hover:grayscale-0 opacity-70 hover:scale-105 transition-transform duration-1000" 
            alt="Voguenr Model"
          />
          <div className="absolute top-10 left-10">
            <h1 className="text-2xl font-black tracking-[0.5em] uppercase border-b border-white/20 pb-2">
              VOGUE<span className="text-emerald-500">NR</span>
            </h1>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="w-full md:w-7/12 flex flex-col justify-center px-8 sm:px-16 py-10">
          <div className="w-full max-w-lg mx-auto">
            {/* Mobile Logo */}
            <div className="md:hidden text-center mb-8">
              <h1 className="text-xl font-black tracking-[0.4em] uppercase text-emerald-500">
                VOGUENR
              </h1>
            </div>

            <header className="mb-10 text-center md:text-left">
              <h2 className="text-4xl font-black tracking-tighter mb-2 italic">JOIN_CLUB</h2>
              <p className="text-slate-500 text-[10px] tracking-[0.3em] uppercase font-bold">Elite Digital Collective Registration</p>
            </header>

            <form className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6" onSubmit={handleSubmit(onSubmit)}>
              
              {/* Full Name */}
              <div className="sm:col-span-2 relative group">
                <label className="text-[9px] uppercase tracking-[0.4em] text-slate-600 font-black absolute -top-5">Full Name</label>
                <input 
                  {...register("fullname", { required: true })}
                  className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-emerald-500 transition-all text-sm placeholder:text-slate-800"
                  placeholder="ALEXANDER VOGUE"
                />
              </div>

              {/* Email */}
              <div className="relative group">
                <label className="text-[9px] uppercase tracking-[0.4em] text-slate-600 font-black absolute -top-5">Email Address</label>
                <input 
                  {...register("email", { required: true })}
                  type="email"
                  className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-emerald-500 transition-all text-sm placeholder:text-slate-800"
                  placeholder="STUDIO@VOGUE.COM"
                />
              </div>

              {/* Contact */}
              <div className="relative group">
                <label className="text-[9px] uppercase tracking-[0.4em] text-slate-600 font-black absolute -top-5">Contact</label>
                <input 
                  {...register("contact", { required: true })}
                  type="text"
                  className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-emerald-500 transition-all text-sm placeholder:text-slate-800"
                  placeholder="+00 123 456"
                />
              </div>

              {/* Password */}
              <div className="sm:col-span-2 relative group pt-2">
                <label className="text-[9px] uppercase tracking-[0.4em] text-slate-600 font-black absolute top-0">Access Key</label>
                <input 
                  {...register("password", { required: true, minLength: 6 })}
                  type="password"
                  className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-emerald-500 transition-all text-sm placeholder:text-slate-800"
                  placeholder="••••••••"
                />
              </div>

              {/* Role Selection (Radio Buttons) */}
              <div className="sm:col-span-2 flex gap-10 py-4 border-y border-white/5 my-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    value={false} 
                    {...register("isSeller")}
                    className="w-4 h-4 accent-emerald-500" 
                    defaultChecked 
                  />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 group-hover:text-white transition-colors">Buyer</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    value={true} 
                    {...register("isSeller")}
                    className="w-4 h-4 accent-emerald-500" 
                  />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 group-hover:text-white transition-colors">Seller</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="sm:col-span-2">
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit" 
                  className="w-full bg-white text-black py-4 uppercase text-[11px] tracking-[0.5em] font-black hover:bg-emerald-500 transition-all rounded-sm shadow-lg shadow-white/5"
                >
                  Create Identity
                </motion.button>
                
                <p className="mt-8 text-center text-[10px] text-slate-600 uppercase tracking-[0.3em]">
                  Active Member? <Link to="/login" className="text-white hover:text-emerald-400 font-bold ml-1 transition-colors">Log_In</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
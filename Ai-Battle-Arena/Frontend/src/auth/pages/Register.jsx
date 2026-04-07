import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { User, Mail, Lock } from 'lucide-react';// lucide-react भी यूज़ कर सकते हैं
import LoadingAnim from '../../pages/LoadingAnim';

const Register = () => {
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await handleRegister(formData);
    if (result) {
      toast.success("Account created!");
      navigate("/");
    }
  };

  if(loading){
    <LoadingAnim/>
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#08040c] p-4">
      {/* Main Box with Neon Glow */}
      <div className="relative flex w-full max-w-4xl overflow-hidden rounded-xl border-2 border-[#7429ec] bg-black shadow-[0_0_20px_#7429ec]">
        
        {/* Left Side: Welcome Text (Diagonal Background) */}
        <div className="relative hidden w-1/2 flex-col justify-center p-12 lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7429ec] to-transparent opacity-20" 
               style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)' }}>
          </div>
          <h2 className="relative z-10 text-4xl font-bold text-white leading-tight">
            WELCOME <br /> BACK!
          </h2>
          <p className="relative z-10 mt-4 text-gray-400">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="w-full p-12 lg:w-1/2">
          <h2 className="mb-8 text-center text-3xl font-bold text-white">Sign Up</h2>
          
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Username */}
            <div className="relative border-b border-gray-600 focus-within:border-[#7429ec] transition-all">
              <input
                name="username"
                type="text"
                placeholder="Username"
                className="w-full bg-transparent py-2 pr-10 text-white outline-none placeholder:text-gray-500"
                onChange={handleChange}
                required
              />
              <User className="absolute right-2 top-3 text-gray-400 text-sm" />
            </div>

            {/* Email */}
            <div className="relative border-b border-gray-600 focus-within:border-[#7429ec] transition-all">
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full bg-transparent py-2 pr-10 text-white outline-none placeholder:text-gray-500"
                onChange={handleChange}
                required
              />
              <Mail className="absolute right-2 top-3 text-gray-400 text-sm" />
            </div>

            {/* Password */}
            <div className="relative border-b border-gray-600 focus-within:border-[#7429ec] transition-all">
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full bg-transparent py-2 pr-10 text-white outline-none placeholder:text-gray-500"
                onChange={handleChange}
                required
              />
              <Lock className="absolute right-2 top-3 text-gray-400 text-sm" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#7429ec] py-3 font-semibold text-white shadow-[0_0_15px_#7429ec] transition hover:bg-[#6221c9] active:scale-95 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#7429ec] hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
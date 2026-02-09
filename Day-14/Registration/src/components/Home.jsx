import React, { useEffect } from 'react';
import { LogOut, User, Layout, Shield , } from 'lucide-react';
import {Link, useNavigate} from "react-router-dom"

const Home = () => {

  const navigate = useNavigate()


  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg"></div>
          <span className="font-bold text-xl tracking-tight">MyApp</span>
        </div>
        
        {/* Logout Button */}
        <button 
          onClick={() => console.log("Logging out...")}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
        >
          <LogOut size={18} />
          <span><Link to='/login'>Logout</Link></span>
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 max-w-5xl mx-auto w-full">
        {/* Welcome Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Home</h1>
          <p className="text-gray-500 mt-2">You are successfully logged into your account.</p>
        </div>

        {/* Simple Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SimpleCard 
            icon={<User className="text-blue-500" />} 
            title="Profile" 
            desc="Manage your account settings" 
          />
          <SimpleCard 
            icon={<Layout className="text-purple-500" />} 
            title="Dashboard" 
            desc="View your current stats" 
          />
          <SimpleCard 
            icon={<Shield className="text-green-500" />} 
            title="Security" 
            desc="Update your password" 
          />
        </div>

        {/* Placeholder Info Box */}
        <div className="mt-12 p-8 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
          <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
          <p className="opacity-90">
            This is your new home page. You can start building your application by adding 
            components to this main content area.
          </p>
        </div>
      </main>
    </div>
  );
};

// Very simple Card Component
const SimpleCard = ({ icon, title, desc }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
    <div className="mb-4">{icon}</div>
    <h3 className="font-bold text-gray-800">{title}</h3>
    <p className="text-sm text-gray-500 mt-1">{desc}</p>
  </div>
);

export default Home;
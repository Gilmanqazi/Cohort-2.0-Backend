import { useContext,  } from "react";
import { register, login, logOut,  } from "../services/auth.api";
import { AuthContext } from "../context";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// ... कॉम्पोनेंट के अंदर

export const useAuth = () => {
  const context = useContext(AuthContext);
const navigate = useNavigate();


  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, setUser, loading, setLoading } = context;

  const handleRegister = async ({ username, email, password }) => {
    try {
      setLoading(true);
      const res = await register(username, email, password);
      
      setUser(res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);

      const res = await login(email, password);

      setUser(res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  
  const handleLogOut = async () => {
    setLoading(true);
    try {
      const res = await logOut();
      
    console.log(res)
      setUser(null); 
      

      toast.success("Logged out successfully");
      
   
      navigate("/login");
      
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleRegister,
    handleLogin,
    user,
    loading,
    handleLogOut
  };
};

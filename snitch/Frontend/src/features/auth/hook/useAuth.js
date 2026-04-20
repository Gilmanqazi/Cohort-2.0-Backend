import { useDispatch } from "react-redux";
import { register, login, getMe } from "../service/auth.api";
import { setUser } from "../state/auth.alice";
import { toast } from "react-toastify"; 

export const useAuth = () => {
  const dispatch = useDispatch();

  
  const handleRegister = async ({ fullname, contact, email, password, isSeller = false }) => {
    try {
      const data = await register({ fullname, contact, email, password, isSeller });
      if (data) {
        dispatch(setUser(data.user)); 
        toast.success("Registration Successful! Welcome");
        return data;
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Registration Failed";
      toast.error(msg); 
      throw error;
    }
  };

 
  const handleLogin = async (email, password) => {
    try {
      const data = await login( email, password ); 
      if (data?.user) {
        dispatch(setUser(data.user));
        toast.success(`Welcome back, ${data.user.fullname || 'User'}!`);
        return data.user;
      }
    } catch (error) {
      const msg = error?.response?.data?.message 
      toast.error(msg);
      console.log(msg)
      throw error;
    }
  };


  const handleGetMe = async () => {
    try {
      const data = await getMe();
      dispatch(setUser(data.user));
      return data.user;
    } catch (error) {
      dispatch(setUser(null));
     
      console.error("Auth session expired");
      throw error;
    }
  };

  return { handleRegister, handleLogin, handleGetMe };
};
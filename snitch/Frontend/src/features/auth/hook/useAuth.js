import { useDispatch } from "react-redux";
import { register, login, getMe } from "../service/auth.api";

import { toast } from "react-toastify";
import { setError, setLoading, setUser } from "../state/auth.alice";

export const useAuth = () => {
  const dispatch = useDispatch()

  // 🔥 REGISTER
  const handleRegister = async ({ fullname, contact, email, password, isSeller = false }) => {
    try {
      dispatch(setLoading(true));

      const data = await register({ fullname, contact, email, password, isSeller });

      if (data?.user) {
        dispatch(setUser(data.user));
        toast.success("Registration Successful!");
        return data;
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Registration Failed";
      dispatch(setError(msg));
      toast.error(msg);
      throw error;
    }
  };

  // 🔥 LOGIN
  const handleLogin = async (email, password) => {
    try {
      dispatch(setLoading(true));

      const data = await login(email, password);

      if (data?.user) {
        dispatch(setUser(data.user));
        toast.success(`Welcome back ${data.user.fullname || "User"}!`);
        return data.user;
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Login Failed";
      dispatch(setError(msg));
      toast.error(msg);
      throw error;
    }
  };

  // 🔥 GET CURRENT USER (important for refresh login persist)
  const handleGetMe = async () => {
    try {
      dispatch(setLoading(true));

      const data = await getMe();

      if (data?.user) {
        dispatch(setUser(data.user));
        return data.user;
      } else {
        dispatch(setUser(null));
      }
    } catch (error) {
      dispatch(setUser(null));
      dispatch(setError("Session expired"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { handleRegister, handleLogin, handleGetMe };
};
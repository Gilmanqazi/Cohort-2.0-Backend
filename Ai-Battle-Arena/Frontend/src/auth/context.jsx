import { createContext,useEffect,useState } from "react";
import { getMe } from "./services/auth.api";
import { DotLottiePlayer } from '@dotlottie/react-player';
import LoadingAnim from "../pages/LoadingAnim";

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        if (data) {
          setUser(data.user); 
        }
      } catch (error) {
        console.error("User unauthorized or session expired");
        setUser(null);
      } finally {
        setLoading(false); 
      }
    };

    fetchUser();
  }, []);


  return (
    <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
   {!loading ? children : <LoadingAnim/>}
    </AuthContext.Provider>
  )

}
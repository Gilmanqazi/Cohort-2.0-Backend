import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import  {Register,Login,getMe,logout} from "../services/auth.api"


export const useAuth = ()=>{
  
  const context = useContext(AuthContext)

  const {user ,setUser, loading, setloading} = context

  const handleRegister  = async (username,email,password)=>{
    setloading(true)
    try{
const res = await Register(username,email,password)
setUser(res.user)
return res.user
    }catch(err){
      console.log(err)
      throw err
    }
    finally{
      setloading(false)
    }
  }

  const handleLogin = async (email,password)=>{
    setloading(true)
try{
  const res = await Login(email,password)
  setUser(res.user)
  return res.user
}catch(err){
  console.log(err)
  throw err
}
finally{
  setloading(false)
}
  }

  const handleGetMe = async () => {
    try {
      setloading(true);
      const res = await getMe();
      setUser(res.user);  
      return res.data;
    } catch (error) {
      console.error("GetMe Error:", error);
      setUser(null);
    } finally {
      setloading(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      setloading(true);
  
      const res = await logout();
      setUser(null);
  
      return res.data;
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(()=>{
   handleGetMe()
  },[])

 return {
  user,loading,handleRegister,handleLogin,handleGetMe,handleLogout
 }

}
import { AuthContext } from "../auth.context"; 
import { useContext } from "react";
import { register,login, } from "../services/auth.api";



export const useAuth = ()=>{

const context = useContext(AuthContext)

const {user,setUser,loading,setLoading} = context

 const handleRegister = async(username,email,password)=>{
  setLoading(true)

try{
  const res = await register(username,email,password)
setUser(res.user);
return res.user
}
catch(err){
  console.log(err)
  throw err
}
finally{
  setLoading(false)
}

}

const handleLogin = async (username,password)=>{

  setLoading(true)
try{
  const res = await login(username,password)
setUser(res);
  return res
}catch(err){
  console.log(err)
  throw err
}finally{
  setLoading(false)
}
}

return{
  user,loading,handleLogin,handleRegister
}

}
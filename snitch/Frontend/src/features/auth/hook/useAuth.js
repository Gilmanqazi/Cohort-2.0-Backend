import {useDispatch} from "react-redux"
import { register,login } from "../service/auth.api"
import { setUser } from "../state/auth.alice"

export const useAuth = () =>{
  
try {
  const dispatch = useDispatch()

  const handleRegister = async ({fullname,contact,email,password,isSeller = false}) => {
  const data = await register({fullname,contact,email,password,isSeller})
  dispatch(setUser(data))
  console.log(data)
  }

  const handleLogin = async (email,password) =>{
  const data = await login(email,password)
  dispatch(setUser(data.user))
  
  console.log(data.user)
  }
  return {handleRegister,handleLogin}
} catch (error) {
  console.log(error)
  throw error
}
}
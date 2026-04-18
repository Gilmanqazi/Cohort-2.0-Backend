import {useDispatch} from "react-redux"
import { register,login, getMe } from "../service/auth.api"
import { setUser } from "../state/auth.alice"

export const useAuth = () =>{
  
try {
  const dispatch = useDispatch()

  const handleRegister = async ({fullname,contact,email,password,isSeller = false}) => {
  const data = await register({fullname,contact,email,password,isSeller})
  dispatch(setUser(data))
  return data
  
  }

  const handleLogin = async (email,password) =>{
  const data = await login(email,password)
  dispatch(setUser(data.user))
  return data.user
  

  }

  const handleGetMe = async ()=>{
  try {
    const data = await getMe()
    dispatch(setUser(data.user))
    return data.user
  } catch (error) {
    dispatch(setUser(null))
    throw error
  }
  }

  return {handleRegister,handleLogin,handleGetMe}
} catch (error) {
  console.log(error)

  throw error
}
}
import axios from "axios"

const api = axios.create({
  baseURL:"http://localhost:3000",
  withCredentials:true
})

export const register = async (username,email,password) =>{
try {
  const res = await api.post("/api/auth/register",{
    username,email,password
  })
  return res.data
} catch (error) {
  console.error("Failed to register",error)
}
}

export const login = async (email,password) =>{
try {
  const res = await api.post("/api/auth/login",{
    email,password
  })
  return res.data
} catch (error) {
  console.error("Failed to login",error)
}
}

export const getMe = async () =>{
  try {
    const res = await api.get("/api/auth/get-Me")

  return res.data
  } catch (error) {
    console.log(error)
  }
}

export const logOut = async () =>{
  try {
    
    const res = await api.post("/api/auth/logOut")
    console.log(res)
    return res.data
  } catch (error) {
    console.error("Failed to logOut",error)
    throw error;
  }
}
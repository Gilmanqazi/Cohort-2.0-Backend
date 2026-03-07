import axios from "axios"

const api = axios.create({
  baseURL:"http://localhost:3000",
  withCredentials:true
})


export const Register = async (username,email,password)=>{

  const res = await api.post("/api/auth/register",{username,email,password})

  return res.data

}

export const Login = async (email,password)=>{

  const res = await api.post("/api/auth/login",{
   email,password
  })

 

  return res.data

}

export const getMe = async ()=>{
  const res = await api.get("/api/auth/getme")

  return res.data
}

export const logout = async()=>{
  const res = await api.get("/api/auth/logout")

  return res.data
}
import axios from "axios"


const api = axios.create({
  baseURL:"/api/auth",
  withCredentials:true
})

export const register = async({fullname,contact,email,password,isSeller}) => {
  try {
    const res = await api.post("/register",{fullname,contact,email,password,isSeller})
  console.log(res.data)
  return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const login = async({email,password}) =>{

  try {
    const res = await api.post("/login",{email,password})
  console.log(res.data)
  return res.data
  } catch (error) {
console.log(error)
    throw error
  }
}

export const getMe = async () =>{
  try {
    const res = await api.get("/getMe")
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
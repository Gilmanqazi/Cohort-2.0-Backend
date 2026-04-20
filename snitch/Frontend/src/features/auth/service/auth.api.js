import axios from "axios"

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
  withCredentials: true
})

export const register = async({fullname,contact,email,password,isSeller}) => {
  try {
    const res = await api.post("/register",{fullname,contact,email,password,isSeller})
  return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const login = async({email,password}) =>{

  try {
    const res = await api.post("/login",{email,password})
  return res.data
  } catch (error) {
console.log(error)
    throw error
  }
}

export const getMe = async () =>{
  try {
    const res = await api.get("/getMe")

    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
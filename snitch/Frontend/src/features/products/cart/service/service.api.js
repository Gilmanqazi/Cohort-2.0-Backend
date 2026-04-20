import axios from "axios"

const api  = axios.create({
  baseURL:"/api/products",
  withCredentials:true
})



export const addToCart = async (productId,quantity) =>{
  try {
    const res = await api.post("/cart",{productId,quantity})
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getAddToCart = async () =>{
  try {
    const res = await api.get("/cart/getUserCart")
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
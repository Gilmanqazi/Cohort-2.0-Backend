import axios from "axios"

const api = axios.create({
  baseURL:"/api/products",
  withCredentials:true
})


export const createProducts = async (formData) =>{

  try {
    const res = await api.post("/",formData)

    console.log(res)
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }

}

export const getSellerProducts = async ()=>{
  try {
    const res = await api.get("/seller")
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}


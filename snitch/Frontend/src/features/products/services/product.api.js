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
    console.error("Service Error:", error.response?.data || error.message);
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

export const getAllProducts = async () =>{
  const res = await api.get("/")
  console.log(res.data)
  return res.data
}


export const getProductById = async (id) =>{
 try {
  console.log("Requesting URL:", `/products/${id}`);
  const res = await api.get(`/${id}`)

  return res.data
 } catch (error) {
  console.error(error,"ERR")
 }

}

export const addToCart = async (productId) =>{
  try {
    const res = await api.post("/cart",{productId})
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getAddToCart = async () =>{
  try {
    const res = await api.get("/cart/getUserCart")
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}


export const addProductVariants = async (productId,newProductVariant) =>{

  const formData = new FormData()

  newProductVariant.images.forEach((Image)=>{
    formData.append("images",Image.file)
  })

  formData.append("stock",newProductVariant.stock)
  formData.append("priceAmount",newProductVariant.price)
  formData.append("attributes",JSON.stringify(newProductVariant.attributes))

  const res = await api.post(`/${productId}/add-Varints`,formData)
  console.log(res.data)
  return res.data

}

import axios from "axios"

const api = axios.create({
  baseURL:"/api/products",
  withCredentials:true
})


export const createProducts = async (formData) =>{

  try {
    const res = await api.post("/",formData)
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
try {
  const res = await api.get("/")
  return res.data
} catch (error) {
  console.log(error)
  throw error
}
}


export const getProductById = async (id) =>{
 try {

  const res = await api.get(`/${id}`)

  return res.data
 } catch (error) {
  console.error(error,)
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
  return res.data

}

export const deleteProductService = async (productId) => {
  try {
    const res = await api.delete(`/delete/${productId}`);
  return res.data;
  } catch (error) {
    console.log(error)
    throw error
  }
};

export const getSearchProduct = async (query)=>{
try {
  const res = await api.get(`/search?q=${query}`)
return res.data
} catch (error) {
  console.log(error)
  throw error
}
}



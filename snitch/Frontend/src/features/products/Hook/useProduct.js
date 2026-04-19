import { addProductVariants, addToCart, createProducts,getAddToCart,getAllProducts,getProductById,getSellerProducts } from "../services/product.api";
import { setAddToCart, setGetCartUser, setProductById, setProducts, setSellerProducts } from "../state/product.slice";
import {useDispatch} from "react-redux"


export const useProduct = ()=>{

const dispatch = useDispatch()

const handleSelectProducts = async (formData) =>{

try {
  const data = await createProducts(formData)
  return data.products
} catch (error) {
  console.log(error)
}

}

const handleGetSellerProducts = async()=>{
  const data = await getSellerProducts()
  dispatch(setSellerProducts(data.products))
  return data.products
}

const handleGetAllProducts = async ()=>{
  const data = await getAllProducts()
 dispatch(setProducts(data.products))
  return data.products
}

const handleProductById = async (id)=>{
try {
  console.log(id,"IDIDIDI")
  const data  = await getProductById(id)
console.log(data.products,"DATATA")
  dispatch(setProductById(data.products))
  return data.products
} catch (error) {
  console.log(error,"ERRRRRR")
}
}

const handleAddToCart = async (productId) =>{
  try {
    const data = await addToCart(productId)
    console.log("Success:", data);
   dispatch(setAddToCart(data))
    return data

  } catch (error) {
    console.log(error)
    throw error
  }
}

const handleGetAddToCart = async ()=>{
  try {
    const data = await getAddToCart()
    console.log(data,"DATATATATA")
    dispatch(setGetCartUser(data.getCarts))
    return data.getCarts
  } catch (error) {
    console.log(error)
    throw error
  }
}

const handleAddProductVariant = async (productId,newProductVariant)=>{

  const data = await addProductVariants(productId,newProductVariant)

  console.log(data)
  return data

}




return {handleSelectProducts,handleGetSellerProducts,handleGetAllProducts,handleProductById,handleAddToCart,handleGetAddToCart,handleAddProductVariant}
}
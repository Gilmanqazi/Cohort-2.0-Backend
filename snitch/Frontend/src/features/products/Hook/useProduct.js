import { createProducts,getSellerProducts } from "../services/product.api";
import { setSellerProducts } from "../state/product.slice";
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
return {handleSelectProducts,handleGetSellerProducts}
}
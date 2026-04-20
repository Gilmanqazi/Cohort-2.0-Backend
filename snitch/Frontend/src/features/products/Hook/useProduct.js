import { toast } from "react-toastify";
import { addProductVariants,  createProducts,deleteProductService,getAllProducts,getProductById,getSearchProduct,getSellerProducts } from "../services/product.api";
import {  clearSearch, setDeleteProduct,  setProductById, setProducts, setSearchLoading, setSearchResults, setSellerProducts } from "../state/product.slice";
import {useDispatch} from "react-redux"


export const useProduct = ()=>{

const dispatch = useDispatch()

const handleSelectProducts = async (formData) =>{

try {
  const data = await createProducts(formData)
  toast.success("Product Created")
  return data.products
} catch (error) {
  const msg = error?.response?.data?.message
  toast.error(msg)
  console.log(error)
}

}

const handleGetSellerProducts = async()=>{
 try {
  const data = await getSellerProducts()
  dispatch(setSellerProducts(data.products))
  return data.products
 } catch (error) {
const msg = error?.response?.data?.message
  toast.error(msg)
 }
}

const handleGetAllProducts = async ()=>{
  const data = await getAllProducts()
 dispatch(setProducts(data.products))
  return data.products
}

const handleProductById = async (id)=>{
try {

  const data  = await getProductById(id)

  dispatch(setProductById(data.products))
  return data.products
} catch (error) {
  const msg = error?.response?.data?.message
toast.error(msg)
}
}

const handleAddProductVariant = async (productId,newProductVariant)=>{

  try {
    const data = await addProductVariants(productId,newProductVariant)
toast.success("Variants Added ")
  return data
  } catch (error) {
  const msg = error?.response?.data?.message
  toast.error(msg)
  }
}

const handleDeleteProduct = async (productId) =>{
  try {
    const data = await deleteProductService(productId)
 

    if (data.success) {
      dispatch(setDeleteProduct(productId)); 
toast.error("Product Deleted ")
    }

    return data;
  } catch (error) {
  const msg = error?.response?.data?.message
  toast.error(msg)
    throw error
  }
}

const handleSearch = async (query)=>{
if(!query || query.length<2){
  dispatch(clearSearch())
  return
}

dispatch(setSearchLoading(true))

try {
  const data = await getSearchProduct(query)
  if(data.success){
    dispatch(setSearchResults(data.products))
  }
} catch (error) {
  console.error("Search Error:", error);
}finally{
  dispatch(setSearchLoading(false))
}
}




return {handleSelectProducts,handleGetSellerProducts,handleGetAllProducts,handleProductById,handleAddProductVariant,handleDeleteProduct,handleSearch}
}
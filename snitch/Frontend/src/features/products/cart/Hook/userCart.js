import { addToCart, getAddToCart } from "../service/service.api";
import { setAddToCart, setGetCartUser } from "../state/cart.slice";
import { useDispatch } from "react-redux";
import {toast} from "react-toastify"



export const useCart = ()=>{

const dispatch = useDispatch()

const handleAddToCart = async (productId, currentQty, type) => {
  const newqty = type === "inc" ? currentQty + 1 : currentQty - 1;
  if (newqty < 1) return;

  try {
    const data = await addToCart(productId, newqty);
    
    if (data.success) {
      dispatch(setAddToCart(data.items)); 
      toast.success(`Product Added`);
    }
  } catch (error) {
    const msg = error?.response?.data?.message
    toast.error(msg)
    console.error("Cart Update Error:", error);
  }
};

const handleGetAddToCart = async ()=>{
  try {
    const data = await getAddToCart()
    dispatch(setGetCartUser(data.getCarts))
    return data.getCarts
  } catch (error) {
    console.log(error)
    throw error
  }
}

return {handleAddToCart,handleGetAddToCart}

}

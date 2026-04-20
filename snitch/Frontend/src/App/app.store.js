import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/auth/state/auth.alice"
import productReducer from "../features/products/state/product.slice"
import cartReducre from "../features/products/cart/state/cart.slice"

export const store = configureStore({
  reducer:{
    auth:authReducer,
    product:productReducer,
    cart:cartReducre
  }
})
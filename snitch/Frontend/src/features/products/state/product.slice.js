import {createSlice} from "@reduxjs/toolkit"

export const productSlice = createSlice({
  name:"product",
  initialState:{
    sellerProduct:[],
    products:[],
    productById:null,
    addToCard:{},
    getCartUser:[],
  },
  reducers:{

    setSellerProducts:(state,action)=>{
      state.sellerProduct = action.payload
    },
    setProducts:(state,action)=>{
      state.products = action.payload
    },
    setProductById:(state,action)=>{
      state.productById = action.payload
    },
    setAddToCart:(state,action)=>{
      state.addToCard = action.payload
    },
    setGetCartUser:(state,action)=>{
      state.getCartUser = action.payload.items
    },
   


  }
})

export const {setSellerProducts,setProducts,setProductById,setAddToCart,setGetCartUser} = productSlice.actions
export default productSlice.reducer
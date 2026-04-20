import {createSlice} from "@reduxjs/toolkit"

export const cartSlice = createSlice({
  name:"cart",
  initialState:{
    addToCard:{},
    getCartUser:[],
  },

  reducers:{
  setAddToCart:(state,action)=>{
    state.getCartUser = [...action.payload]; 
      
    // 2. Backup ke liye action status bhi save kar sakte ho
    state.addToCard = { success: true };
  },
  setGetCartUser:(state,action)=>{
    state.getCartUser = action.payload.items || action.payload;
  },
}

})

export const {setAddToCart,setGetCartUser} = cartSlice.actions
export default cartSlice.reducer
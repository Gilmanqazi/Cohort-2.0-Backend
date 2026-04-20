import {createSlice} from "@reduxjs/toolkit"

export const productSlice = createSlice({
  name:"product",
  initialState:{
    sellerProduct:[],
    products:[],
    productById:null,
    deleteProduct:[],
    searchResults: [],
    isSearchLoading: false
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
    setDeleteProduct: (state,action)=>{
      state.deleteProduct = action.payload

      const deletedId = action.payload.id || action.payload; 

  state.sellerProduct = state.sellerProduct.filter(
    (product) => product._id !== deletedId
  );
    },

    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setSearchLoading: (state, action) => {
      state.isSearchLoading = action.payload;
    },
    clearSearch: (state) => {
      state.searchResults = [];
    }
  
  }
})

export const {setSellerProducts,setProducts,setProductById,setAddToCart,setGetCartUser,setDeleteProduct,setSearchResults,setSearchLoading,clearSearch} = productSlice.actions
export default productSlice.reducer
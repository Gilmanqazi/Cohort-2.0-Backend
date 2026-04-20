import {createBrowserRouter} from "react-router-dom"
import Register from "../features/auth/pages/Register"
import Login from "../features/auth/pages/Login"
import CreateProduct from "../features/products/pages/CreateProducts"
import GetSellerProducts from "../features/products/pages/GetSellerProducts"
import ProtectedRoute from "../features/protectedRoute"
import AddToCartPage from "../features/products/cart/pages/AddToCartPage"
import CheckOut from "../features/products/pages/CheckOut"
import SellerProductDetails from "../features/products/pages/SellerProductDetails"
// import SellerDashboard from "../features/products/pages/SellerProductDetails"
import Home from "../features/products/pages/Home"
import ProductsDetails from "../features/products/pages/ProductsDetails"
import NotFound from "../features/products/components/NotFound"



export const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    
    path:"/createProduct",
    element:(
      <ProtectedRoute Role = "seller">
        <CreateProduct/>
        </ProtectedRoute>
    )
  
  },
  {
    path:"/getProducts",
    element:(
      <ProtectedRoute Role="seller">
    <GetSellerProducts/>
    </ProtectedRoute>
  )
  },
 
  {
    path:"/addToCart",
    element:<AddToCartPage/>
  },
  {
    path:"/checkout",
   element:(<ProtectedRoute Role="buyer">
    <CheckOut/>
   </ProtectedRoute>)
  },
 {
  path:"/seller/products/:id",
  element:(<ProtectedRoute Role="seller">
 <SellerProductDetails/>
  </ProtectedRoute>)
 },
 {
  path:"/products/:id",
  element:<ProductsDetails/>
 },
 {
  path:"*",
  element:<NotFound/>
 }

  
])
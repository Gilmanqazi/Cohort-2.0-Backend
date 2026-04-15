import {createBrowserRouter} from "react-router-dom"
import Register from "../features/auth/pages/Register"
import Login from "../features/auth/pages/Login"
import CreateProduct from "../features/products/pages/CreateProducts"
import GetSellerProducts from "../features/products/pages/GetSellerProducts"
import ProtectedRoute from "../features/protectedRoute"


export const router = createBrowserRouter([
  {
    path:"/",
    element:<h1>Weloome To Home</h1>
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
      <ProtectedRoute allowedRole = "seller">
        <CreateProduct/>
        </ProtectedRoute>
    )
  
  },
  {
    path:"/getProducts",
    element:(
      <ProtectedRoute allowedRole="seller">
    <GetSellerProducts/>
    </ProtectedRoute>
  )
  }
])
import {createBrowserRouter} from "react-router-dom"
import Login from "../features/auth/pages/Login"
import Register from "../features/auth/pages/Register"
import ChatUI from "../features/auth/components/ChatUI"

export const router = createBrowserRouter([
  {
path:"/",
element: <ChatUI/>
  },
  {
    path:"/login",
    element: <Login/>

  },
  {
    path:"/register",
    element: <Register/>
  }
])
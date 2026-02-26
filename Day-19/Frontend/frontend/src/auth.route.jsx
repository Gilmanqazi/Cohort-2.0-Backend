import {  Route, Routes,  } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import { AuthProvider } from "./features/auth/auth.context";
import Home from "./features/post/pages/Feed";
import {PostContextProvider}  from "./features/post/feed.Context";
import CreatePost from "./features/post/pages/CreatePost";
import { Follow } from "./features/post/services/post.api";


const AppRoutes = ()=>{
  
 return ( 
  <AuthProvider>
  <PostContextProvider>
 <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/createPost" element={<CreatePost/>}/> 
    <Route path="/follow" element={<Follow/>}/>
  </Routes>
  </PostContextProvider>
  </AuthProvider>
 )
}

export default AppRoutes;


import React from 'react';
import AppRoutes from "./auth.route"
import { BrowserRouter } from 'react-router-dom';
import "./features/auth/shared/globle.scss"
import "./features/auth/style/form.scss"
import {ToastContainer} from "react-toastify"


const App = () => {
  return (
  <>
  
  <BrowserRouter>
  <AppRoutes/>
<ToastContainer position='top-right' autoClose={1500}/>
  </BrowserRouter>
  </>
    
  );
};

export default App;
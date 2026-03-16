import React from 'react';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import { RouterProvider } from 'react-router-dom';
import { router } from './app.routes';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
<RouterProvider router={router}/>
<ToastContainer/>
    </div>
  );
};

export default App;
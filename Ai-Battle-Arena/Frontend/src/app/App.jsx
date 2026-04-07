import React from 'react';

import AIChatBattle from '../components/AIChatBattle';

import { Route, Routes } from 'react-router-dom';
import Register from '../auth/pages/Register';
import Login from '../auth/pages/Login';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>

<Toaster 
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
  
   <Routes>
<Route path='/' element={<AIChatBattle/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/login' element={<Login/>}/>
{/* <Route path='/chat/:id' element={<h1>Gilman</h1>}/> */}
   </Routes>
    </div>
  );
};

export default App;
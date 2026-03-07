import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './features/Auth/auth.context.jsx'
import { ToastContainer} from 'react-toastify';
import { SongContextProvider } from './features/home/song.contect.jsx'


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SongContextProvider>
  <BrowserRouter>
  <App />
  <ToastContainer/>
  </BrowserRouter>
  </SongContextProvider>
  </AuthProvider>
    
)

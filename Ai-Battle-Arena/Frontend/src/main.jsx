import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.jsx'
import { AuthProvider } from './auth/context.jsx'
import { AIProvider } from './ai.context.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
<AuthProvider>
    <AIProvider>
        <BrowserRouter>
    <App />
    </BrowserRouter>
    </AIProvider>
    </AuthProvider>
)

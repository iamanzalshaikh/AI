import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthContext.jsx' // ✅ This is your context provider
import UserContext from "./context/UserContext.jsx"
import ShopContext from './context/ShopContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <UserContext>
        <ShopContext>
          <App />
        </ShopContext>


      </UserContext>


    </AuthProvider>
  </BrowserRouter>
)

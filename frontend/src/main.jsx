import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CustomBrowserRouter from './components/CustomBrowserRouter'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomBrowserRouter>
      <AuthProvider>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </CustomBrowserRouter>
  </React.StrictMode>,
)

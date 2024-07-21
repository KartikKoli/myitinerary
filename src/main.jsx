import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <App />
    <ToastContainer></ToastContainer>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)

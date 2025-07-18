import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from './router/router.jsx'
import { RouterProvider } from 'react-router'
import { ThemeProvider } from './provider/ThemeContext.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async'


// AOS imports
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS before render
AOS.init({
  duration: 1000,
  once: true,
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" autoClose={3000} />
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
)

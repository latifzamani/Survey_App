import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './routes.jsx'
import { RouterProvider } from 'react-router-dom'
import ContextProvider from './context/contextProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
    <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>,
)


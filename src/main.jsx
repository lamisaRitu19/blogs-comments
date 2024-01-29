import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import BlogProvider from './context/BlogProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BlogProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </BlogProvider>
  </React.StrictMode>,
)

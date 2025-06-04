import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from './pages/Home.jsx';
import Root from './routes/Root.jsx';
import Error from './pages/Error.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    errorElement: Error,
    Component: Root ,
    children: [

      {
        path: '/',
        Component: Home,
      },
      {
        path:'/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      },
      {
        
      }

    ]

  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />

  </StrictMode>,
)

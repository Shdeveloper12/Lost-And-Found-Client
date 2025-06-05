import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from './pages/Home.jsx';
import Root from './routes/Root.jsx';
import Error from './pages/Error.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import lostAndFoundPages from './pages/lostAndFoundPages.jsx';
import AddLostAndFound from './pages/privatePages/AddLostAndFound.jsx';
import AllRecoveredItemsPage from './pages/privatePages/AllRecoveredItemsPage.jsx';
import ManageMyItemsPage from './pages/privatePages/ManageMyItemsPage.jsx';



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
        path: '/lostandfound',
        Component: lostAndFoundPages
      },
      {
        path: '/addlostandfounditemspage',
        Component: AddLostAndFound
      },
      {
        path: '/allrecovered',
        Component: AllRecoveredItemsPage
      },
      {
        path: '/manageitem',
        Component: ManageMyItemsPage

      }

    ]

  },
]);

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <ToastContainer position="top-center" />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    

  </StrictMode>,
)

import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home.jsx";
import Root from "./routes/Root.jsx";
import Error from "./pages/Error.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./pages/privatePages/PrivateRoutes.jsx";
import AddLostAndFound from "./pages/privatePages/AddLostAndFound.jsx";
import AllRecoveredItemsPage from "./pages/privatePages/AllRecoveredItemsPage.jsx";
import ManageMyItemsPage from "./pages/privatePages/ManageMyItemsPage.jsx";
import PostDetailsPages from "./pages/privatePages/PostDetailsPages.jsx";
import LostAndFoundPages from "./pages/lostAndFoundPages.jsx";
import UpdateLostAndFound from "./pages/privatePages/UpdateItemsPage.jsx";


const loadPostById = async ({params}) =>{
  const res = await fetch (`${import.meta.env.VITE_API_URL}/lostandfounditems`);
  const data = await res.json();
  return data.find(post => post._id === params.id);
}

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error></Error>,
    element: <Root></Root>,
    children: [
      {
        path: "/",
        loader: () =>
          fetch(`${import.meta.env.VITE_API_URL}/lostandfounditems`),
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/lostandfound",
        loader: () =>
          fetch(`${import.meta.env.VITE_API_URL}/lostandfounditems`),
        element: <LostAndFoundPages></LostAndFoundPages>,
      },
      {
        path: "/addlostandfounditemspage",
        element: <PrivateRoute><AddLostAndFound></AddLostAndFound></PrivateRoute>
      },
      {
        path: "/updatelostandfoundpost/:id",
        loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/lostandfounditems/${params.id}`),
        element: <PrivateRoute><UpdateLostAndFound></UpdateLostAndFound></PrivateRoute>
      },
      {
        path: '/postdetails/:id',
        loader: loadPostById,
        element:<PrivateRoute><PostDetailsPages></PostDetailsPages></PrivateRoute> ,
      },
      {
        path: "/allrecovered",
        element: <PrivateRoute><AllRecoveredItemsPage></AllRecoveredItemsPage></PrivateRoute>
      },
      {
        path: "/manageitem",
        element:<PrivateRoute><ManageMyItemsPage></ManageMyItemsPage></PrivateRoute>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer position="top-center" />
    <AuthProvider>
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  </StrictMode>
);

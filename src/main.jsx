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
import lostAndFoundPages from "./pages/lostAndFoundPages.jsx";
import AddLostAndFound from "./pages/privatePages/AddLostAndFound.jsx";
import AllRecoveredItemsPage from "./pages/privatePages/AllRecoveredItemsPage.jsx";
import ManageMyItemsPage from "./pages/privatePages/ManageMyItemsPage.jsx";
import PostDetailsPages from "./pages/privatePages/PostDetailsPages.jsx";
import { Group } from "lucide-react";

const loadPostById = async ({params}) =>{
  const res = await fetch (`${import.meta.env.VITE_API_URL}/lostandfounditems`);
  const data = await res.json();
  return data.find(post => post._id === params.id);
}

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error></Error>,
    Component: Root,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/lostandfound",
        loader: () =>
          fetch(`${import.meta.env.VITE_API_URL}/lostandfounditems`),
        Component: lostAndFoundPages,
      },
      {
        path: "/addlostandfounditemspage",
        Component: AddLostAndFound,
      },
      {
        path: '/postdetails/:id',
        loader: loadPostById,
        Component: PostDetailsPages,
      },
      {
        path: "/allrecovered",
        Component: AllRecoveredItemsPage,
      },
      {
        path: "/manageitem",
        Component: ManageMyItemsPage,
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

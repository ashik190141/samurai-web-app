import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import * as ReactDOM from "react-dom/client";
import * as React from "react";
import './index.css';
import Login from './Authetication/Login/Login';
import Home from './Home/Home';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: '/',
        element: <Home></Home>
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import * as ReactDOM from "react-dom/client";
import * as React from "react";
import './index.css';
import Login from './Authetication/Login/Login';
import Home from './Home/Home';
import Registration from "./Authetication/Registration/Registration";
import UserDashboardLayout from "./layout/UserDashboardLayout";
import ReportIssue from './User/ReportIssue/ReportIssue';
import Question from './User/Question/Question';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ExchangeIdea from "./User/ExchangeIdea/ExchangeIdea";
import SendMessage from './User/SendMessage/SendMessage';
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "register",
        element: <Registration></Registration>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <UserDashboardLayout></UserDashboardLayout>,
    children: [
      {
        path: "issue",
        element: <ReportIssue></ReportIssue>,
      },
      {
        path: "question",
        element: <Question></Question>,
      },
      {
        path: "exchange",
        element: <ExchangeIdea></ExchangeIdea>,
      },
      {
        path: "send-message/:email",
        element: <SendMessage></SendMessage>
      }
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </QueryClientProvider>
);

import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Main from "../layout/Main";
import NotFound from "../NotFound/NotFound";
import Blogs from "../pages/Blogs/Blogs";

import AdminPage from "../pages/Dashboard/AdminPage/AdminPage";
import ReportItems from "../pages/Dashboard/AdminPage/ReportItems";

import MyOrders from "../pages/Dashboard/BuyerPage/MyOrders";
import Payment from "../pages/Dashboard/Payment/Payment";

import AddProducts from "../pages/Dashboard/SellerPage/AddProducts/AddProducts";
import MyBuyers from "../pages/Dashboard/SellerPage/MyBuyers/MyBuyers";
import MyProducts from "../pages/Dashboard/SellerPage/MyProducts/MyProducts";
import CategoryUsed from "../pages/Home/CategoryUsed/CategoryUsed";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import DisplayError from "../pages/shared/DisplayError/DisplayError";
import SignUp from "../pages/SignUp/SignUp";
import AdminRouter from "./AdminRouter";
import BuyerRouter from "./BuyerRouter";
import PrivateRouter from "./PrivateRouter";
import SellerRouter from "./SellerRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/categoryUsed/:id",
        loader: ({ params }) =>
          fetch(
            `https://gobuysellphone-server.vercel.app/categoryUsed/${params.id}`
          ),
        element: (
          <PrivateRouter>
            <CategoryUsed></CategoryUsed>
          </PrivateRouter>
        ),
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRouter>
            <MyOrders></MyOrders>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/myorders",
        element: (
          <BuyerRouter>
            <MyOrders></MyOrders>
          </BuyerRouter>
        ),
      },
      {
        path: "/dashboard/admin",
        element: (
          <AdminRouter>
            <AdminPage></AdminPage>
          </AdminRouter>
        ),
      },
      {
        path: "/dashboard/addproducts",
        element: (
          <SellerRouter>
            <AddProducts></AddProducts>
          </SellerRouter>
        ),
      },
      {
        path: "/dashboard/myproducts",
        element: (
          <SellerRouter>
            <MyProducts></MyProducts>
          </SellerRouter>
        ),
      },
      {
        path: "/dashboard/mybuyers",
        element: (
          <SellerRouter>
            <MyBuyers></MyBuyers>
          </SellerRouter>
        ),
      },
      {
        path: "/dashboard/reportitems",
        element: (
          <PrivateRouter>
            <ReportItems></ReportItems>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <PrivateRouter>
            <Payment></Payment>
          </PrivateRouter>
        ),
        loader: ({ params }) =>
          fetch(
            `https://gobuysellphone-server.vercel.app/buyerorders/${params.id}`
          ),
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Main from "../layout/Main";

import AdminPage from "../pages/Dashboard/AdminPage/AdminPage";

import MyOrders from "../pages/Dashboard/BuyerPage/MyOrders";

import AddProducts from "../pages/Dashboard/SellerPage/AddProducts/AddProducts";
import MyBuyers from "../pages/Dashboard/SellerPage/MyBuyers/MyBuyers";
import MyProducts from "../pages/Dashboard/SellerPage/MyProducts/MyProducts";
import CategoryUsed from "../pages/Home/CategoryUsed/CategoryUsed";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import AdminRouter from "./AdminRouter";
import BuyerRouter from "./BuyerRouter";
import PrivateRouter from "./PrivateRouter";
import SellerRouter from "./SellerRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
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
          fetch(`http://localhost:5000/categoryUsed/${params.phone_id}`),
        element: <CategoryUsed></CategoryUsed>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard/myorders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/myorders",
        element: <MyOrders></MyOrders>,
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
        element: <AddProducts></AddProducts>,
      },
      {
        path: "/dashboard/myproducts",
        element: (
          <PrivateRouter>
            <SellerRouter>
              <MyProducts></MyProducts>
            </SellerRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/mybuyers",
        element: (
          <PrivateRouter>
            <SellerRouter>
              <MyBuyers></MyBuyers>
            </SellerRouter>
          </PrivateRouter>
        ),
      },
    ],
  },
]);

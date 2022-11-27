import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useBuyer from "../hooks/useBuyer";
import useSeller from "../hooks/useSeller";
import useTitle from "../hooks/useTitle";
import Navbar from "../pages/shared/Navbar/Navbar";
const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isBuyer] = useBuyer(user?.email);
  const [isSeller] = useSeller(user?.email);

  useTitle("Dashboard");

  return (
    <div className="sticky top-0">
      <Navbar></Navbar>
      <div className="drawer drawer-mobile container mx-auto ">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content ">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80  text-base-content text-xl">
            {isBuyer && (
              <li>
                <Link className="my-2" to="/dashboard/myorders">
                  My Orders
                </Link>
              </li>
            )}
            {isSeller && (
              <>
                <li>
                  <Link className="my-2" to="/dashboard/addproducts">
                    Add Products
                  </Link>
                </li>
                <li>
                  <Link className="my-2" to="/dashboard/myproducts">
                    My Products
                  </Link>
                </li>
                <li>
                  <Link className="my-2" to="/dashboard/mybuyers">
                    My Buyers
                  </Link>
                </li>
              </>
            )}

            {isAdmin && (
              <>
                <li>
                  <Link className="my-2" to="/dashboard/admin">
                    All Seller
                  </Link>
                </li>
                <li>
                  <Link className="my-2" to="/dashboard/admin">
                    All Buyers
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

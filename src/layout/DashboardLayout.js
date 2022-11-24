import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../pages/shared/Navbar/Navbar";
const DashboardLayout = () => {
  return (
    <div className="sticky top-0">
      <Navbar></Navbar>
      <div className="drawer drawer-mobile w-[1440px] m-auto ">
        <input
          id="dashboard-drawer-2"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content ">
          <Outlet></Outlet>
          <label
            htmlFor="dashboard-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="dashboard-drawer-2"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80  text-base-content text-xl">
            <li>
              <Link className="my-2" to="/dashboard">
                My Orders
              </Link>
            </li>
            <li>
              <Link className="my-2" to="/dashboard">
                Add Products
              </Link>
            </li>
            <li>
              <Link className="my-2" to="/dashboard">
                My Products
              </Link>
            </li>
            <li>
              <Link className="my-2" to="/dashboard">
                My Buyers
              </Link>
            </li>
            <li>
              <Link className="my-2" to="/dashboard">
                All Seller
              </Link>
            </li>
            <li>
              <Link className="my-2" to="/dashboard">
                All Buyers
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

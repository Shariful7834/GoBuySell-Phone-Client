import React from "react";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useSeller from "../hooks/useSeller";

const SellerRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  let location = useLocation();
  const [isSeller, isSellerLoading] = useSeller(user?.email);

  if (loading || isSellerLoading) {
    return (
      <button type="button" className="bg-indigo-500 ..." disabled>
        <svg
          className="animate-spin h-5 w-5 mr-3 ..."
          viewBox="0 0 24 24"
        ></svg>
        Processing...
      </button>
    );
  }

  if (user && user.uid && isSeller) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default SellerRouter;

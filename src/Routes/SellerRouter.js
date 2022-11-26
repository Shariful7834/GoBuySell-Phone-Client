import React from "react";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useSeller from "../hooks/useSeller";
import LoadingRipple from "../components/LoadingRipple/LoadingRipple";

const SellerRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  let location = useLocation();
  const [isSeller, isSellerLoading] = useSeller(user?.email);

  if (loading || isSellerLoading) {
    return <LoadingRipple></LoadingRipple>;
  }

  if (user && user.uid && isSeller) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default SellerRouter;

import React from "react";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useBuyer from "../hooks/useBuyer";
import LoadingRipple from "../components/LoadingRipple/LoadingRipple";

const BuyerRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  let location = useLocation();
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email);

  if (loading || isBuyerLoading) {
    return <LoadingRipple></LoadingRipple>;
  }

  if (user && user.uid && isBuyer) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default BuyerRouter;

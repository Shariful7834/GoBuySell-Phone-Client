import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { useContext } from "react";

const DisplayError = () => {
  const { logOut } = useContext(AuthContext);
  const error = useRouteError();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <p className="text-red-500">Something went wrong</p>
      <p className="text-red-500">{error.statusText || error.message}</p>
      <h4 className="text-3xl">
        <button onClick={handleLogOut}>Please Sign out</button> and try again
      </h4>
    </div>
  );
};

export default DisplayError;

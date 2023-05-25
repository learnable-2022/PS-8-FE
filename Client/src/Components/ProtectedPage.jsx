import React, { useContext } from "react";
import { myContext } from "../ContextAPI";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedPage = () => {
  const { loggedIn } = useContext(myContext);

  if (!loggedIn) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

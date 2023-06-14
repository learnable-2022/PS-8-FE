import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const ProtectedPage = () => {
  const userAuth = () => {
    const token = window.localStorage.getItem("HR_access_token");

    return token;
  };

  const location = useLocation();

  const isAuth = userAuth();

  return isAuth ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
};

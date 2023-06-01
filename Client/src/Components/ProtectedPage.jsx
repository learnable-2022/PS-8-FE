import React from "react";
import {  Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export const ProtectedPage = () => {
  const userAuth = () => {
    const user = window.localStorage.getItem("payMe_signIn");
    const token = window.localStorage.getItem("HR_access_token");


    return user && token;
  };

  const navigate = () => {
    toast.warning("Please Sign In");
    setTimeout(() => {
      window.location = "/";
    }, 1000);
  };

  const isAuth = userAuth();
  return (
    isAuth ? <Outlet /> : navigate()
  );
};



import React from "react";
import {  Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export const ProtectedPage = () => {
  const userAuth = () => {
    const user = window.localStorage.getItem("payMe_signIn");
    const token = window.localStorage.getItem("HR_access_token");
<<<<<<< Updated upstream


=======
<<<<<<< HEAD
>>>>>>> Stashed changes
    return user && token;
  };

=======


    return user && token;
  };

>>>>>>> f9eec61a79b40cb00280c8ee88962cede23931a9
  const navigate = () => {
    toast.warning("Please Sign In");
    setTimeout(() => {
      window.location = "/";
<<<<<<< HEAD
    }, 2000);
=======
    }, 1000);
>>>>>>> f9eec61a79b40cb00280c8ee88962cede23931a9
  };

  const isAuth = userAuth();
  return (
    isAuth ? <Outlet /> : navigate()
  );
};



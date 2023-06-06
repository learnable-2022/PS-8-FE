import React, { useEffect } from "react";
// import { TbLogout } from "react-icons/tb";
// import { IoNotificationsOutline } from "react-icons/io5";
import { Upload } from "../Pages/Upload";
import Header from "../Pages/Header";
import { Nav_Bar } from "../Pages/Nav_Bar";
import { toast } from "react-toastify";

export const Payroll_Dashboard = () => {
  
  useEffect(() => {
    toast("Welcome to PayMe");
  }, []);

  return (
    <>
      <header>
        <Header />{" "}
      </header>
      <main className="flex flex-row flex-grow ">
        <div className="w-[17%]">
          <Nav_Bar />
        </div>

        <div className="w-[83%] ">
          <Upload />
        </div>
      </main>
    </>
  );
};

import React from "react";
// import { TbLogout } from "react-icons/tb";
// import { IoNotificationsOutline } from "react-icons/io5";
import { Upload } from "../Pages/Upload";
import Header from "../Pages/Header";
import { Nav_Bar } from "../Pages/Nav_Bar";

export const Payroll_Dashboard = () => {
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

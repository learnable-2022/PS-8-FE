import React, { useContext, useEffect } from "react";
// import { TbLogout } from "react-icons/tb";
// import { IoNotificationsOutline } from "react-icons/io5";
import { Upload } from "../Pages/Upload";
import Header from "../Pages/Header";
import { Nav_Bar } from "../Pages/Nav_Bar";
import { toast } from "react-toastify";
import { myContext } from "../ContextAPI";

export const Payroll_Dashboard = () => {
  useEffect(() => {
    toast("Welcome to PayMe");
  }, []);

  const { nav } = useContext(myContext);

  return (
    <>
      <header>
        <Header />{" "}
      </header>
      <main className="flex flex-row ">
        <div className={`md:w-[17%] hidden md:flex justify-center`}>
          <Nav_Bar />
        </div>
        {nav ? (
          <div
            className={`md:w-[17%] ${
              nav ? "w-[45%]" : "w-0"
            } md:justify-center md:hidden`}
          >
            <Nav_Bar />
          </div>
        ) : (
          ""
        )}

        <div
          className={`md:w-[83%] ${nav ? "w-[75%] overflow-auto" : "w-full"}`}
        >
          <Upload />
        </div>
      </main>
    </>
  );
};

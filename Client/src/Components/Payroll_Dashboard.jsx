import React, { useContext, useEffect } from "react";
// import { TbLogout } from "react-icons/tb";
// import { IoNotificationsOutline } from "react-icons/io5";
import { Upload } from "../Pages/Upload";
import request from "../axios";
import Header from "../Pages/Header";
import { Nav_Bar } from "../Pages/Nav_Bar";
import { toast } from "react-toastify";
import { myContext } from "../ContextAPI";

export const Payroll_Dashboard = () => {
  const { nav } = useContext(myContext);
  const { _id: id } = JSON.parse(window.localStorage.getItem("userInfo"));

  useEffect(() => {
    toast("Welcome to PayMe");
    validateToken();
  }, []);

  const validateToken = async () => {
    try {
      const response = await request.get(`/users/${id}`);

      if (response?.data) {
        const { user } = response.data;
        window.localStorage.setItem("userInfo", JSON.stringify(user));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="flex flex-row ">
        <div className={`md:w-[17%] hidden md:flex justify-center`}>
          <Nav_Bar />
        </div>
        {nav ? (
          <div
            data-aos="fade-right"
            data-aos-duration="500"
            className={`md:w-[17%]  ${
              nav
                ? "w-[65%] translate-x-0 fixed shadow-black/70 shadow-md transition-transform duration-500"
                : "w-0 translate-x-[-80%] transition-all duration-500"
            } md:justify-center md:hidden`}
          >
            <Nav_Bar />
          </div>
        ) : (
          ""
        )}

        <div className={`md:w-[83%] ${nav ? "w-full overflow-auto h-full" : "w-full h-screen"}`}>
          <Upload />
        </div>
      </main>
    </>
  );
};

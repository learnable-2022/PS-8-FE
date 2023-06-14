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
<<<<<<< HEAD
          <div
            data-aos="fade-right"
            data-aos-duration="500"
            className={`md:w-[17%]  ${
              nav
                ? "w-[65%] translate-x-0 fixed shadow-black/70 shadow-md transition-transform duration-500"
                : "w-0 translate-x-[-80%] transition-all duration-500"
            } md:justify-center md:hidden`}
          >
=======
          <div className={`md:w-[17%] ${nav ? "w-[45%]" : "w-0"} md:justify-center md:hidden`}>
>>>>>>> ebcf8095fc26c298dd7a5b9ee3132f78a4e9b811
            <Nav_Bar />
          </div>
        ) : (
          ""
        )}

<<<<<<< HEAD
        <div
          className={`md:w-[83%] ${
            nav ? "w-full overflow-auto h-full" : "w-full h-screen"
          }`}
        >
=======
        <div className={`md:w-[83%] ${nav ? "w-[75%] overflow-auto" : "w-full"}`}>
>>>>>>> ebcf8095fc26c298dd7a5b9ee3132f78a4e9b811
          <Upload />
        </div>
      </main>
    </>
  );
};

import React, { useContext, useState } from "react";
import { AiOutlineDollar, AiOutlineLogout } from "react-icons/ai";
import { VscServerProcess } from "react-icons/vsc";
import { MdPolicy } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import "../index.css";
import { NavLink } from "react-router-dom";
import { myContext } from "../ContextAPI";
import { TbLogout } from "react-icons/tb";


export const Nav_Bar = () => {
  const { processData, handleNotification, notification, handleLogout } = useContext(myContext);
  
  return (
    <aside className="w-full">
      <nav className="md:flex overflow-hidden flex-col h-screen bg-[#ffffff] w-full py-6 ">
        <ul className="flex flex-col fixed gap-2 md:w-[17%] w-full">
          <NavLink activeClassName="active" to="/dashboard">
            <li className="flex items-center h-[8vh] pl-[5%] md:pl-[15%] gap-2 hover:text-[#ffffff] transition duration-500 hover:bg-[#430359] w-[100%] text-md">
              <AiOutlineDollar className="md:text-xl text-[1.8rem]  md:flex" />
              Payroll
            </li>
          </NavLink>

          <NavLink activeClassName="active" to="/processor">
            {processData.length > 0 ? (
              <li
                onClick={handleNotification}
                className="flex items-center justify-start hover:py-5 pl-[5%] md:pl-[15%] h-[8vh] gap-2 hover:text-[#ffffff] transition duration-500 hover:bg-[#430359] text-md w-[100%]"
              >
                <VscServerProcess className="md:text-xl text-[1.8rem]  md:flex" />{" "}
                Processor
                {notification ? (
                  <BsDot className="md:ml-[-15%]  md:flex mt-[-2%] -ml-9 text-[#DBBB23] text-6xl" />
                ) : (
                  ""
                )}
              </li>
            ) : (
              <li className="flex items-center justify-start hover:py-5 pl-[5%] md:pl-[15%] h-[8vh] gap-2 hover:text-[#ffffff] transition duration-500 hover:bg-[#430359] text-md w-[100%]">
                <VscServerProcess className="md:text-xl text-[1.8rem]  md:flex" />{" "}
                Processor
              </li>
            )}
          </NavLink>

          {/* <NavLink activeClassName="active"> */}
          <li className="flex gap-2 justify-start  h-[8vh] items-center pl-[5%] md:pl-[15%]  hover:text-[#ffffff] transition duration-500 hover:bg-[#430359] text-md w-[100%]">
            <MdPolicy className="md:text-xl text-[1.6rem]  md:flex" /> Pay
            Policy
          </li>
          {/* </NavLink> */}

          <div
            className="flex items-center text-start  text-black/80 justify-start pl-[5%] h-[7vh] md:pl-[15%] gap-2 mt-[18rem] cursor-pointer  hover:font-bold text-lg transition duration-300 w-full md:w-[90%] md:rounded-md text-md"
            onClick={handleLogout}
          >
            <TbLogout className="md:text-xl md:flex text-[1.8rem] text-black/80" />
            Logout
          </div>
        </ul>
      </nav>
    </aside>
  );
};

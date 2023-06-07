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
    <aside className="">
      <nav className="flex overflow-hidden  flex-col h-screen bg-[#ffffff]  py-6 ">
        <ul className="flex flex-col fixed w-[17%]">
          <NavLink activeClassName="active" to="/dashboard">
            <li className="flex items-center text-start justify-start pl-5 h-[10vh]  gap-2 hover:text-[#ffffff] hover:bg-[#430359] w-[100%]">
              <AiOutlineDollar className="text-xl" />
              Payroll
            </li>
          </NavLink>

           

          <NavLink activeClassName="active" to="/processor">
            {processData.length > 0 ? (
              <li
                onClick={handleNotification}
                className="flex items-center justify-start hover:py-5 pl-5 h-[10vh] gap-2 hover:text-[#ffffff]  hover:bg-[#430359] w-[100%]"
              >
                <VscServerProcess className="text-xl" /> Processor
                {notification ? (
                  <BsDot className="ml-[-15%] mt-[-2%] text-[red] text-6xl" />
                ) : (
                  ""
                )}
              </li>
            ) : (
              <li className="flex items-center justify-start hover:py-5 pl-5 h-[10vh] gap-2 hover:text-[#ffffff]  hover:bg-[#430359] w-[100%]">
                <VscServerProcess className="text-xl" /> processor
              </li>
            )}
          </NavLink>

          <NavLink activeClassName="active" to="/pay_policy">
            <li className="flex items-center justify-start hover:py-5 pl-5 h-[10vh] gap-2 hover:text-[#ffffff]  hover:bg-[#430359] w-[100%]">
              <MdPolicy className="text-xl" /> Pay Policy
            </li>
          </NavLink>
          
            <div
            className="flex items-center text-start text-[#1A1A1A] justify-start pl-5 h-[10vh]  gap-2 mt-[8.6rem] cursor-pointer hover:bg-[#430359] w-[100%]" 
            onClick={handleLogout}
            >
            <TbLogout className="text-2xl text-black/60 hover:text-[#ffffff]" />
            Logout
          </div>
        </ul>

      </nav>
         
    </aside>
  );
};

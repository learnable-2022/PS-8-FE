import React, { useContext, useState } from "react";
import { AiOutlineDollar } from "react-icons/ai";
import { VscServerProcess } from "react-icons/vsc";
import { MdPolicy } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import "../index.css";
import { NavLink } from "react-router-dom";
import { myContext } from "../ContextAPI";

export const Nav_Bar = () => {
  const { processData, handleNotification, notification } = useContext(myContext);
  
  return (
    <aside className="">
      <nav className="flex overflow-hidden  flex-col h-screen bg-[#ffffff]  py-6 ">
        <ul className="flex flex-col mt-10 gap-5 fixed w-[17%]">
          <NavLink activeClassName="active" to="/dashboard">
            <li className="flex items-center text-start justify-start pl-5 h-[10vh]  gap-2 hover:text-[#430359] hover:bg-[#E5E5E5] w-[100%]">
              <AiOutlineDollar className="text-xl" />
              Payroll
            </li>
          </NavLink>

          <NavLink activeClassName="active" to="/processor">
            {processData.length > 0 ? (
              <li
                onClick={handleNotification}
                className="flex items-center justify-start hover:py-5 pl-5 h-[10vh] gap-2 hover:text-[#430359]  hover:bg-[#E5E5E5] w-[100%]"
              >
                <VscServerProcess className="text-xl" /> processor
                {notification ? (
                  <BsDot className="ml-[-15%] mt-[-2%] text-[red] text-6xl" />
                ) : (
                  ""
                )}
              </li>
            ) : (
              <li className="flex items-center justify-start hover:py-5 pl-5 h-[10vh] gap-2 hover:text-[#430359]  hover:bg-[#E5E5E5] w-[100%]">
                <VscServerProcess className="text-xl" /> processor
              </li>
            )}
          </NavLink>

          <NavLink activeClassName="active" to="/pay_policy">
            <li className="flex gap-2 justify-start pl-4 h-[10vh] items-center  hover:text-[#430359] hover:bg-[#E5E5E5] w-[100%]">
              <MdPolicy className="text-2xl" /> Pay Policy
            </li>
          </NavLink>
        </ul>
      </nav>
    </aside>
  );
};

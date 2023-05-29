import React from "react";
import { AiOutlineDollar } from "react-icons/ai";
import { VscServerProcess } from "react-icons/vsc";
import "../index.css";
import { NavLink } from "react-router-dom";

export const Nav_Bar = () => {
  return (
    <aside>
      <nav className="flex overflow-hidden flex-col h-screen bg-[#ffffff]  py-6 border border-r shadow-lg shadow-black/20">
        <ul className="flex flex-col mt-10 gap-10">
          <NavLink activeClassName="active" to="/dashboard">
            <li className="flex items-center text-start justify-start hover:py-5 pl-[15%] gap-2 hover:text-[#430359] hover:bg-[#F5E4FB] ">
              <AiOutlineDollar className="text-xl" />
              Payroll
            </li>
          </NavLink>

          <NavLink activeClassName="active" to="/processor">
            <li className="flex items-center justify-start hover:py-5 pl-[15%] gap-2 hover:text-[#430359] hover:bg-[#F5E4FB] ">
              <VscServerProcess className="text-xl" /> Processor
            </li>
          </NavLink>

          <NavLink activeClassName="active" to="/database">
            <li className="flex gap-2 justify-start pl-[15%]  hover:text-[#430359] hover:bg-[#F5E4FB]">
              <VscServerProcess className="text-xl" /> Database
            </li>
          </NavLink>
        </ul>
      </nav>
    </aside>
  );
};

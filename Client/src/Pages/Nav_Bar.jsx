import React from "react";
import { AiOutlineDollar } from "react-icons/ai";
import { VscServerProcess } from "react-icons/vsc";
import "../index.css";
import { Link, Outlet } from "react-router-dom";

export const Nav_Bar = () => {
  return (
    <aside>
      <div className="flex flex-col h-screen bg-[#ffffff]  py-6 border border-r shadow-inner shadow-black/20">
        <nav className="flex-grow fixed">
          <ul className="flex flex-col mt-10 ml-10 gap-10">
            <li className="flex items-center gap-2 hover:text-[#430359] hover:bg-[#F5E4FB] hover:w-[100%]">
              <AiOutlineDollar className="text-xl" />
              <Link to="/dashboard">Payroll</Link>
            </li>
            <li className="flex items-center gap-2 hover:text-[#430359] hover:bg-[#F5E4FB]">
              <VscServerProcess className="text-xl" />{" "}
              <Link to="/dashboard/processor">Processor</Link>
            </li>
            <li className="flex items-center gap-2 hover:text-[#430359] hover:bg-[#F5E4FB]">
              <VscServerProcess className="text-xl" />{" "}
              <Link to="/dashboard/database">Database</Link>
            </li>

          </ul>
        </nav>
      </div>
    </aside>
  );
};

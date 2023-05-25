import React from 'react'
import { AiOutlineDollar } from "react-icons/ai";
import { VscServerProcess } from "react-icons/vsc";
import '../index.css';

export const Nav_Bar = () => {
    return (
        <aside>
        <div className="flex flex-col h-screen bg-[#ffffff] shadow-sm py-6">
          <nav className="flex-grow">
            <ul className="flex flex-col">
              <li className=" linav flex items-center p-2 hover:text-[#430359] hover:bg-[#F5E4FB] hover:w-[100%]">
                <AiOutlineDollar className="mr-2" /> Payroll
              </li>
              <li className="linav flex items-center p-2 hover:text-[#430359] hover:bg-[#F5E4FB]">
                <VscServerProcess className="mr-2" /> Processor
              </li>
            </ul>
          </nav>
        </div>
      </aside>
       
        
    );
};



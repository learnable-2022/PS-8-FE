import React, { useContext } from "react";
import { myContext } from "../ContextAPI";
import { Outlet } from "react-router-dom";

export const Upload = () => {
  return (
    <div className="w-[100%] bg-[#e5e5e5]">
    
      <Outlet />
    </div>
  );
};

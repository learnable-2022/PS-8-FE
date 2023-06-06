import React, { useContext } from "react";
import { myContext } from "../ContextAPI";
import { Outlet } from "react-router-dom";

export const Upload = () => {
  return (
    <div className="w-[100%] h-full payroll-bg">
    
      <Outlet />
    </div>
  );
};

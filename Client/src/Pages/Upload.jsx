import React from "react";
import { Outlet } from "react-router-dom";
// import { myContext } from "../ContextAPI";

export const Upload = () => {
  // const { isFile, processData, processPayroll } = useContext(myContext);
  return (
    <div className=" bg-[#E5E6FF] h-full">
      <Outlet />
    </div>
  );
};

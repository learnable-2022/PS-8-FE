import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

export const Upload = () => {
  return (
    <div className=" bg-[#E5E6FF] h-full">
      <Outlet/>
    </div>
  );
};

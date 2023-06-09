import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

export const Upload = () => {
  return (
    <div className=" bg-[#F5E4FB] h-screen">
      <Outlet/>
    </div>
  );
};

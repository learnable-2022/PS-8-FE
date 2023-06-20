import React from "react";
import { Outlet } from "react-router-dom";
// import { myContext } from "../ContextAPI";

export const Upload = () => {
  // const { isFile, processData, processPayroll } = useContext(myContext);
  return (
    <div className={`bg-[#F5E4FB] w-full`}>
      <Outlet />
    </div>
  );
};

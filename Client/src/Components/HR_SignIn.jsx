import { useState, useContext } from "react";
import { myContext } from "../ContextAPI";
export const HR_SignIn = () => {
  const { myName } = useContext(myContext);

  return (
    <div>
      <div className="text-red-500 font-extrabold text-5xl flex justify-center w-full text-center mt-40">
        <p>Hello People</p>
        <p>{myName}</p>
      </div>
    </div>
  );
};

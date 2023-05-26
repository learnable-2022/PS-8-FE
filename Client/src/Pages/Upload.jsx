import React, { useContext } from "react";
import { myContext } from "../ContextAPI";
import { Outlet } from "react-router-dom";

export const Upload = () => {
  const { uploadFile, handleButtonClick } = useContext(myContext);
  return (
    <div className="w-[100%] bg-[#e5e5e5]">
      <div className="w-full justify-center flex mt-[6%]">
        <div className="w-[90%] items-center flex justify-between">
          <h2 className="text-2xl font-bold">Payroll</h2>
          <form>
            <input
              className="hidden"
              id="SelectedFile"
              type="file"
              multiple
              accept=".xlsx, .xls"
              onChange={uploadFile}
            />
          </form>
          <button
            onClick={handleButtonClick}
            className="bg-[#430359] hover:bg-purple-900 text-white font-bold py-2 px-7 rounded-lg"
          >
            Upload
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

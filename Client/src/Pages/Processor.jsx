import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { myContext } from "../ContextAPI";

export const Processor = () => {
  const { processData, processUploadedData } = useContext(myContext);
  return (
    <div>
      <div className="w-full flex justify-center pt-[2%] ">
        <div className="w-[90%] items-center flex justify-between">
          <h2 className="text-[34px] font-bold">Processor</h2>
          <button
            onClick={processUploadedData}
            className="bg-[#430359] transition duration-300 hover:bg-purple-900 text-white font-bold py-2 px-7 rounded-lg"
          >
            Process Payroll
          </button>
        </div>
      </div>
      {processData.length > 0 ? (
        <div className="w-full justify-center flex">
          <div className="w-[90%] flex gap-5">
            <Link to="/processor">
              <button className="bg-white px-5  font-bold py-2 mt-6 rounded-xl">
                Payroll
              </button>
            </Link>
            <Link to="/processor/history">
              <button className="bg-white px-5  font-bold py-2 mt-6 rounded-xl">
                History
              </button>
            </Link>
            <Link to="/processor/disbursement">
              <button className="bg-white px-5  font-bold py-2 mt-6 rounded-xl">
                Disbursements
              </button>
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
      <Outlet />
    </div>
  );
};

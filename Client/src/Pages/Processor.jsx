import React, { useContext, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { myContext } from "../ContextAPI";
import { Loading_Animation } from "../UTILS/Loading_Animation";

export const Processor = () => {
  const {
    processData,
    processUploadedData,
    loadingProcessedPayroll,
    processPayroll,
    alert,
  } = useContext(myContext);
  const [active, setActive] = useState(0);
  const handleActive = (item) => {
    setActive(item);
  };

  return (
    <div>
      <div className="flex justify-end pr-10 w-full overflow-hidden ">
        <p
          className={`${
            alert === ""
              ? "translate-x-[500px] transition-all duration-1000 bg-white  px-10 py-3 rounded-lg text-[green]"
              : "translate-x-0 transition-all duration-1000 mt-5 bg-white   px-10 py-3 rounded-lg text-[green]"
          }    `}
        >
          {alert}
        </p>
      </div>
      <div className="w-full flex justify-center pt-[3%]">
        <div className="w-[90%] items-center flex justify-between">
          <h2 className="text-[34px] font-bold">Processor</h2>
          {processPayroll.length > 0 ? (
            <button className="bg-[#430359] transition duration-300 hover:bg-purple-900 text-white font-bold py-2 px-7 rounded-lg">
              Disburse Salary
            </button>
          ) : (
            <button
              onClick={processUploadedData}
              className="bg-[#430359] transition duration-300 hover:bg-purple-900 text-white font-bold py-2 px-7 rounded-lg"
            >
              Process Payroll
            </button>
          )}
        </div>
      </div>
      {processData.length > 0 ? (
        <div className="w-full justify-center flex">
          <div className="w-[90%] flex justify-between items-center ">
            <div className="gap-2 flex">
              <NavLink to="/processor" activeClassName="active-route">
                <button
                  onClick={() => handleActive(0)}
                  className={`${
                    active === 0 ? "border-b-[#430161] border" : ""
                  } bg-white px-5  font-bold py-2 mt-6 rounded-xl`}
                >
                  Payroll
                </button>
              </NavLink>
              <NavLink to="/processor/history" activeClassName="active-route">
                <button
                  onClick={() => handleActive(1)}
                  className={`${
                    active === 1 ? "border-b-[#430161] border" : ""
                  } bg-white px-5  font-bold py-2 mt-6 rounded-xl`}
                >
                  History
                </button>
              </NavLink>
              <NavLink
                to="/processor/disbursement"
                activeClassName="active-route"
              >
                <button
                  onClick={() => handleActive(2)}
                  className={`${
                    active === 2 ? "border-b-[#430161] border" : ""
                  } bg-white px-5  font-bold py-2 mt-6 rounded-xl`}
                  activeClassName="active"
                >
                  Disbursements
                </button>
              </NavLink>
            </div>
            <div className="flex items-start pr-10 mt-5 ">
              {loadingProcessedPayroll ? <Loading_Animation /> : ""}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <Outlet />
    </div>
  );
};

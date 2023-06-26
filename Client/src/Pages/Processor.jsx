import { useContext, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { myContext } from "../ContextAPI";
import { Loading_Animation } from "../UTILS/Loading_Animation";
import { BsDot } from "react-icons/bs";

export const Processor = () => {
  const {
    processData,
    processUploadedData,
    loadingProcessedPayroll,
    processPayroll,
    alert,
    disburseSalary,
    isPayrollDisbursed,
  } = useContext(myContext);
  const [active, setActive] = useState(0);
  const handleActive = (item) => {
    setActive(item);
  };

  return (
    <div className="">
      <div className="flex justify-end pr-10 w-full overflow-hidden ">
        <p
          className={`${
            alert === ""
              ? `translate-x-[500px] transition-all duration-1000 bg-white  px-10 py-3 rounded-lg text-[green]`
              : "translate-x-0 transition-all duration-1000 mt-5 bg-white   px-10 py-3 rounded-lg text-[green]"
          }    `}
        >
          {alert}
        </p>
      </div>
      <div className="w-full h-full flex justify-center">
        <div className="w-[90%] md:items-center flex flex-col md:flex md:flex-row justify-between">
          <h2 className="text-[34px] font-bold text-[#2E3192]">Processor</h2>

          <>
            {!processPayroll?.length > 0 ? (
              <button
                onClick={processUploadedData}
                className={`bg-[#2E3192] transition duration-300 hover:bg-[#4448c0] text-white font-bold py-2 px-5 md:px-7 mt-3 md:mt-auto rounded-lg md:w-auto ${
                  processData?.length === 0 ? "hidden" : "flex"
                }`}
              >
                Process Payroll
              </button>
            ) : (
              <button
                className={`bg-[#2E3192] transition duration-300 hover:bg-[#4448c0] text-white font-bold py-2 px-7 rounded-lg ${
                  isPayrollDisbursed ? "hidden" : ""
                }`}
                onClick={disburseSalary}
              >
                Disburse Salary
              </button>
            )}
          </>
        </div>
      </div>

      <div className="w-full justify-center flex">
        <div className="w-[90%]  flex flex-col md:flex md:flex-row justify-between md:items-center ">
          <div className="gap-2 flex ">
            <Link to="/processor" activeClassName="active-route">
              <button
                onClick={() => handleActive(0)}
                className={`${
                  active === 0 ? "border-b-[#2E3192] border-2 md:border" : ""
                } bg-white px-5  font-bold py-2 mt-6 rounded-xl`}
              >
                Payroll
              </button>
            </Link>
            <Link to="/processor/history" activeClassName="active-route">
              <button
                onClick={() => handleActive(1)}
                className={`${
                  active === 1 ? "border-b-[#2E3192] border-2 md:border" : ""
                } bg-white px-5  font-bold py-2 mt-6 rounded-xl`}
              >
                History
                {isPayrollDisbursed && (
                  <BsDot className="md:ml-[-15%]  md:flex mt-[-2%] -ml-9 text-[#DBBB23] text-3xl" />
                )}
              </button>
            </Link>
          </div>
          <div className="flex items-start md:pr-10 mt-5">
            {loadingProcessedPayroll ? <Loading_Animation /> : ""}
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

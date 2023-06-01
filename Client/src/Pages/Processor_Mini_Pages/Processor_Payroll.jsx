import React, { useContext } from "react";
import { myContext } from "../../ContextAPI";
import { Link } from "react-router-dom";

export const Processor_Payroll = () => {
  const { processData, removeProcessor } = useContext(myContext);

  return (
    <div>
      {processData.length > 0 ? (
        <div>
          <div className="w-full flex justify-center mb-20">
            <table className="w-[90%] rounded-2xl h-full bg-white mt-2">
              <thead className="text-left h-[70px] text-black/50 font-medium ">
                <tr className="">
                  <th className=" border-b pb-2 px-[1%]">Name</th>
                  <th className="border-b pb-2 px-[1%]">Employee ID</th>
                  <th className="border-b pb-2 px-[1%]">Employee Role</th>
                  <th className="border-b pb-2 px-[1%]">Appraisal</th>
                  <th className="border-b pb-2 px-[1%]">Attendance</th>
                  <th className="border-b pb-2 px-[1%]">Overtime</th>
                  <th className="border-b pb-2 px-[1%]">Leave</th>
                  <th className="border-b pb-2 px-[1%]">
                    Base Salary (per month)
                  </th>
                </tr>
              </thead>

              <tbody className="text-left font-semibold text-black/60">
                {processData.map((parentArray, index) => (
                  <React.Fragment key={index}>
                    {parentArray.map((file, innerIndex) => (
                      <tr key={innerIndex} className="h-[60px]">
                        <td className="border-b py-2 px-[1%]">{file.Name}</td>
                        <td className="border-b px-[1%]">{file.EmployeeID}</td>
                        <td className="border-b px-[1%]">{file.Role}</td>
                        <td className="border-b px-[1%]">{file.Appraisal}</td>
                        <td className="border-b pl-[3%]">{file.Attendance}</td>
                        <td className="border-b px-[1%]">{file.Overtime}</td>
                        <td className="border-b pl-[2%]">{file.Leave}</td>
                        <td className="border-b pl-[5%]">${file.BaseSalary}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div className="full flex justify-center mb-20">
            <button
              className="bg-white px-5 py-2 rounded-lg"
              onClick={removeProcessor}
            >
              Remove Data
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <div className="bg-[#ededed] w-[90%] py-[10%] mt-10 rounded-xl shadow-black/20 shadow-md">
            <p className="flex items-center justify-center text-gray-500 text-sm">
              No data found
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

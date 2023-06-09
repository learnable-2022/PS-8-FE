import React, { useContext } from "react";
import { myContext } from "../../ContextAPI";
import { Processor_Processed_Payroll } from "./Processor_Processed_Payroll";

export const Processor_Payroll = () => {
  const { processData, removeProcessor, processPayroll } =
    useContext(myContext);
  // console.log(processData);
  const columnHeader =
    processData.length > 0 ? Object.keys(processData[0]) : [];

  return (
    <div className="">
      {processPayroll.length > 0 ? (
        <div className="w-full flex justify-center mb-10">
          <Processor_Processed_Payroll />
        </div>
      ) : (
        <div>
          {processData.length > 0 ? (
            <div>
              <div className="w-full flex justify-center mb-10 ">
                <div
                  className="w-[90%] rounded-2xl h-full bg-white mt-2 overflow-x-scroll"
                  style={{
                    scrollBehavior: "smooth",
                    overflow: "auto",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  <table className="min-w-full">
                    <thead className="text-left h-[70px] text-black/70 font-medium ">
                      <tr className="border-b">
                        {columnHeader.map((header, index) => (
                          <th
                            key={index}
                            className="pl-[1.5%] whitespace-nowrap pr-10"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {processData.map((row, index) => (
                        <tr key={index} className="border-b">
                          {columnHeader.map((header, index) => (
                            <td
                              key={index}
                              className="py-2 text-sm pl-[1.5%] whitespace-nowrap pr-10"
                            >
                              {row[header]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-center my-4">
                <button
                  onClick={removeProcessor}
                  className="bg-white px-5 py-2 rounded-lg"
                >
                  Remove Data{" "}
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="bg-[#ffffff] w-[90%] py-[10%] mt-10 rounded-xl shadow-black/20 shadow-md">
                <p className="flex items-center justify-center text-gray-500 text-sm">
                  No data found
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

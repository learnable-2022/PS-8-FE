import React, { useContext, useState, Fragment } from "react";
import { myContext } from "../../ContextAPI";

export const Processor_History = () => {
  const { showDataHistory, date } = useContext(myContext);
  console.log(showDataHistory);

  return (
    <div className={`w-full ${showDataHistory.length > 0 ? "h-full" : "h-screen"}`}>
      <div className="w-full flex justify-center">
        {showDataHistory?.length > 0 ? (
          <div className="w-[90%] rounded-2xl h-full bg-white mt-2 overflow-x-scroll">
            <table className="min-w-full">
              <thead className="text-left h-[70px] text-black/70 font-medium ">
                <tr className="border-b">
                  {Object.keys(showDataHistory[0]).map((header) => (
                    <th
                      key={header}
                      className="pl-[1.5%] pr-10 whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {showDataHistory.map((item, index) => (
                  <tr key={index} className="border-b">
                    {Object.values(item).map((value, index) => (
                      <Fragment key={index}>
                        <td className="py-3 text-sm pl-[1.5%] pr-10 whitespace-nowrap">
                          {value}
                        </td>
                      </Fragment>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <div className="bg-[#ffffff] w-[90%] py-[10%] mt-10 rounded-xl md:shadow-black/20 md:shadow-md">
              <p className="flex items-center justify-center text-gray-500 text-sm">
                No data found
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

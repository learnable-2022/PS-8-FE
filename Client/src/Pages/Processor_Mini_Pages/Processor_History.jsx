import React, { useContext } from "react";
import { myContext } from "../../ContextAPI";

export const Processor_History = () => {
  const { showDataHistory } = useContext(myContext);
  const currentDate = new Date();

  console.log(showDataHistory);

  return (
    <div className="w-full">
      <div className="w-full flex justify-center">
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
                    <td
                      key={index}
                      className="py-3 text-sm pl-[1.5%] pr-10 whitespace-nowrap"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      ;
    </div>
  );
};

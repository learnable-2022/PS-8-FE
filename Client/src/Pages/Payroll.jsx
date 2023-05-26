import React from "react";
import { useContext } from "react";
import { myContext } from "../ContextAPI";

export const Payroll = () => {
  const { isFile } = useContext(myContext);
  return (
    <div>
      <div className="w-full flex justify-center">
        {isFile.length > 0 ? (
          // <table>
          //   <thead>
          //     <tr>
          //       {Object.keys(data[0]).map((key) => (
          //         <th key={key}>{key}</th>
          //       ))}
          //     </tr>
          //   </thead>
          //   <tbody>
          //     {isFile.map((row, index) => (
          //       <tr key={index}>
          //         {Object.values(row).map((index, value) => (
          //           <td key={index}>{value}</td>
          //         ))}
          //       </tr>
          //     ))}
          //   </tbody>
          // </table>
          <ul>
            {isFile.map((row, index) => (
              <li key={index}>{JSON.stringify(row)}</li>
            ))}
          </ul>
        ) : (
          <div className="bg-[#ededed] w-[90%] py-[10%] mt-10 rounded-xl shadow-black/20 shadow-md">
            <p className="flex items-center justify-center text-gray-500 text-sm">
              No data found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

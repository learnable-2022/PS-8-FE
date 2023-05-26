import React from "react";
import { useContext } from "react";
import { myContext } from "../ContextAPI";

export const Payroll = () => {
  const { uploadFile, handleButtonClick, isFile } = useContext(myContext);

  return (
    <div>
      <div className="w-full ">
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
          <div className="w-full flex justify-center">
          <ul className="w-4/5 mt-5">
            {isFile.map((row, index) => (
              <li key={index}>{JSON.stringify(row)}</li>
            ))}
          </ul>
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
    </div>
  );
};

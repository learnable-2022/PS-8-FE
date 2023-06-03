import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { myContext } from "../ContextAPI";
import { Loading_Animation } from "../UTILS/Loading_Animation";

export const Payroll = () => {
<<<<<<< Updated upstream
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
=======
  const {
    uploadFile,
    handleButtonClick,
    isFile,
    fileName,
    moveData,
    moveIsSuccessful,
    removeData,
    typeError,
    isLoading,
    loading,
  } = useContext(myContext);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (fileName) {
      setFiles([...files, fileName]);
    }
  }, [fileName]);

  const columnHeader = isFile.length > 0 ? Object.keys(isFile[0]) : [];
  return (
    <div>
      <div className="w-full">
        <div className="flex justify-end pr-10 w-full overflow-hidden ">
          <p
            className={`${
              !moveIsSuccessful
                ? "translate-x-[500px] transition-all duration-1000"
                : "translate-x-0 transition-all duration-1000 mt-5"
            } bg-white px-10 py-3 rounded-lg text-[green] `}
          >
            {moveIsSuccessful}
          </p>
        </div>
        <div className="w-full justify-center flex pt-[3%]">
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
            {isFile.length > 0 ? (
              <div className="flex gap-5">
                <button
                  onClick={() => {
                    loading();
                    moveData();
                  }}
                  className="bg-[#430359] transition duration-300 hover:bg-purple-900 text-white font-bold py-2 px-7 rounded-lg"
                >
                  Move file to processor
                </button>
                <button
                  onClick={handleButtonClick}
                  className="bg-[#430359] transition duration-300 hover:bg-purple-900 text-white font-bold py-2 px-7 rounded-lg"
                >
                  Upload
                </button>
              </div>
            ) : (
              <button
                onClick={handleButtonClick}
                className="bg-[#430359] transition duration-300 hover:bg-purple-900 text-white font-bold py-2 px-7 rounded-lg"
              >
                Upload
              </button>
            )}
          </div>
        </div>

        {isFile.length > 0 ? (
          <div>
            <div className="w-full justify-center flex">
              <div className="w-[90%] flex justify-between items-center">
                <button className="bg-white px-5 py-2 mt-6 rounded-xl">
                  {fileName}
                </button>

                <p className="pr-10 mt-[2%]">
                  {isLoading ? <Loading_Animation /> : ""}
                </p>
              </div>
            </div>
            <div className="w-full flex justify-center mb-10">
              <table className="w-[90%] rounded-2xl h-full bg-white mt-2 overflow-x-scroll">
                <thead className="text-left h-[70px] text-black/70 font-medium ">
                  <tr className="border-b ">
                    {columnHeader.map((header, index) => (
                      <th
                        key={index}
                        className="pl-[1.5%] flex overflow-x-scroll overflow-auto"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {isFile.map((row, index) => (
                    <tr key={index} className="border-b">
                      {columnHeader.map((header, index) => (
                        <td key={index} className="py-2 text-sm pl-[1.5%]">
                          {row[header]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="full flex justify-center mb-20">
              <button
                className="bg-white px-5 py-2 rounded-lg"
                onClick={removeData}
              >
                Remove Data
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="w-full flex justify-center">
              <div className="bg-[#ededed] w-[90%] py-[10%] mt-10 rounded-xl shadow-black/20 shadow-md">
                <p className="flex items-center justify-center text-gray-500 text-sm">
                  No data found
                </p>
              </div>
            </div>
            {typeError !== "" ? (
              <div className="w-full flex justify-center mt-20">
                <p className="bg-[#F5E4FB] px-20 py-2 text-[red] rounded-lg">
                  {typeError}
                </p>
              </div>
            ) : (
              ""
            )}
>>>>>>> Stashed changes
          </div>
        )}
      </div>
    </div>
  );
};

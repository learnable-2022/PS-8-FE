import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { myContext } from "../ContextAPI";
import { Loading_Animation } from "../UTILS/Loading_Animation";

export const Payroll = () => {
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
                  {isFile.map((file) => (
                    <tr key={file.EmployeeID} className="h-[60px]">
                      <td className="border-b py-2 px-[1%]">{file.Name}</td>
                      <td className="border-b px-[1%]">{file.EmployeeID}</td>
                      <td className="border-b px-[1%]">{file.Role}</td>
                      <td className="border-b px-[1%] ">{file.Appraisal}</td>
                      <td className="border-b pl-[3%]">{file.Attendance}</td>
                      <td className="border-b px-[1%]">{file.Overtime}</td>
                      <td className="border-b pl-[2%]">{file.Leave}</td>
                      <td className="border-b pl-[5%]">${file.BaseSalary}</td>
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
          </div>
        )}
      </div>
    </div>
  );
};

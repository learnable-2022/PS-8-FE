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
    nav,
  } = useContext(myContext);
  const [files, setFiles] = useState([]);
  console.log(
    isFile
      ?.filter((item) => item["Monthly base pay ($)"] <= 3000)
      .map((item) => item["Monthly base pay ($)"])
  );

  useEffect(() => {
    if (fileName) {
      setFiles([...files, fileName]);
    }
  }, [fileName]);

  const columnHeader = isFile?.length > 0 ? Object.keys(isFile[0]) : [];
  return (
    <div>
      <div className={`md:w-full ${isFile.length > 0 ? "h-full" : "h-screen"}`}>
        <div className="flex justify-end pr-10 w-full overflow-hidden ">
          <p
            className={`${
              !moveIsSuccessful
                ? "translate-x-[500px] transition-all duration-1000"
                : "translate-x-0 transition-all duration-1000 mt-5"
            } bg-white px-10 py-3 rounded-lg text-[green]`}>
            {moveIsSuccessful}
          </p>
        </div>
        <div className="w-full  justify-center flex">
          <div
            className={`w-[90%] md:items-center md:flex md:flex-row flex flex-col justify-between`}>
            <h2 className="text-[34px] font-bold mb-5 md:mb-auto">Payroll</h2>
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
            {isFile?.length > 0 ? (
              <div
                className={` ${
                  nav
                    ? "sm:flex  flex flex-col-reverse sm:flex-row"
                    : "sm:flex sm:flex-row flex flex-col-reverse"
                } gap-2 md:gap-5 md:flex md:flex-row`}>
                <button
                  onClick={() => {
                    loading();
                    moveData();
                  }}
                  className="bg-[#2E3192] text-start sm:text-center transition duration-300 hover:bg-[#595FFF] text-white font-bold  py-2 px-7 rounded-lg">
                  Move file to processor
                </button>
                <button
                  onClick={handleButtonClick}
                  className="bg-[#2E3192] transition text-start sm:text-center duration-300 hover:bg-[#595FFF] text-white font-bold py-2 px-7 rounded-lg">
                  Import File
                </button>
              </div>
            ) : (
              <button
                onClick={handleButtonClick}
                className="bg-[#2E3192] transition text-start sm:text-center duration-300 hover:bg-[#595FFF] text-white font-bold py-2 px-7 rounded-lg cursor-pointer">
                Import File{" "}
              </button>
            )}
          </div>
        </div>

        {isFile?.length > 0 ? (
          <div>
            <div className="w-full  justify-center flex">
              <div className="w-[90%] flex justify-between items-center">
                <button className="bg-white px-5 py-2 mt-6 rounded-xl">
                  {fileName}
                </button>

                <p className="md:pr-10 mt-[2%]">
                  {isLoading ? <Loading_Animation /> : ""}
                </p>
              </div>
            </div>
            <div className="w-full flex justify-center mb-10">
              <div className="w-[90%] rounded-2xl h-full bg-white mt-2 overflow-x-scroll">
                <table className="min-w-full ">
                  <thead className="text-left h-[70px] text-black/70 font-medium">
                    <tr className="border-b ">
                      {columnHeader.map((header, index) => (
                        <th
                          key={index}
                          className="pl-[1.5%] pr-10 whitespace-nowrap">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {isFile.map((row, index) => (
                      <tr key={index} className="border-b">
                        {columnHeader.map((header, index) => (
                          <td
                            key={index}
                            className="py-3 text-sm pl-[1.5%] pr-10 whitespace-nowrap">
                            {row[header]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="h-full flex justify-center pb-20">
              <button
                className="bg-white px-5 py-2 rounded-lg cursor-pointer"
                onClick={removeData}>
                Remove Data
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="w-full flex justify-center">
              <div className="bg-[#ffffff] w-[90%] py-[10%] mt-10 rounded-xl md:shadow-black/20 md:shadow-md">
                <p className="flex items-center justify-center text-gray-500 text-sm">
                  No data found
                </p>
              </div>
            </div>
            {typeError !== "" ? (
              <div className="w-full flex justify-center mt-20">
                <p className="bg-[#F5F5F5] px-20 py-2 text-[red] rounded-lg">
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

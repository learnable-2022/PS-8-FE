import { useContext, useState } from "react";
import { myContext } from "../ContextAPI";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { titleCase } from "../UTILS/Title";
import { Link, useParams } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { AddNewEmployee } from "./AddNewEmployee";
import { IoIosAdd } from "react-icons/io";
import SyncLoader from "react-spinners/SyncLoader";
import fetcher from "../fetcher";
import useSWR from "swr";

export const Employees_Database = () => {
  const { data, error, isLoading } = useSWR("/employees", fetcher);

  const employeeData = data?.employees;
  console.log(employeeData);

  const { deleteEmployee, createCard } = useContext(myContext);
  const totalNumberOfEmployees = employeeData?.reduce((sum) => sum + 1, 0) ?? 0;
  const [employee, setEmployee] = useState("");

  const handleEmployeeChange = (e) => {
    setEmployee(e.target.value);
  };

  const [firstHalf, setFirstHalf] = useState(6);

  const showMore = () => {
    if (firstHalf === employeeData.length) {
      setFirstHalf(firstHalf > 5 ? 6 : employeeData.length);
    } else {
      setFirstHalf(employeeData.length);
    }
  };

  const { more_details } = useParams();

  const filteredUsers = employeeData
    ?.filter((user) => user.name === more_details)
    .map((item) => {
      return (
        <Link
          to="/employees"
          key={item._id}
          className="fixed h-full w-full md:w-screen flex justify-center   bg-gray-900 backdrop-blur-sm bg-opacity-50"
        >
          <div className="md:w-[83%] w-full h-full md:h-[90%] mt-[55%] md:mt-0">
            <div className="flex justify-center items-center md:w-4/5 md:h-4/5 h-2/5 w-full">
              <Link
                to="#"
                className="flex md:flex-col-reverse lg:flex-row flex-col justify-center md:justify-start bg-white card_parent w-[85%]  px-5 rounded-xl shadow-md shadow-black/10 hover:shadow-xl hover:shadow-black/50  transition duration-500"
              >
                <div className="flex md:flex-row flex-col md:w-[85%] w-full items-start pt-5 gap-5">
                  <div className="w-full md:hidden flex justify-center">
                    <figure className="h-4/5 w-4/5">
                      <img
                        src={item.profileImage}
                        alt={item.name}
                        className="w-full h-full"
                      />
                      <figcaption className="flex gap-5 justify-center text-black/40 pt-2">
                        <span className="text-black/70 text-2xl">
                          {titleCase(item.name)}
                        </span>
                      </figcaption>
                      <figcaption className="flex justify-center gap-5 text-justify text-black/40 ">
                        <span className="text-black/70 ">{item.jobRole}</span>
                      </figcaption>
                    </figure>
                  </div>

                  <figure className="md:w-[45%] lg:w-2/5 md:flex flex-col hidden lg:h-[70%]">
                    <img
                      src={item.profileImage}
                      alt={item.name}
                      className="w-full h-full"
                    />
                    <figcaption className="flex gap-5 justify-center text-black/40 pt-2">
                      <span className="text-black/70 md:text-lg lg:text-2xl">
                        {titleCase(item.name)}
                      </span>
                    </figcaption>
                    <figcaption className="flex justify-center gap-5 text-justify text-black/40 ">
                      <span className="text-black/70 ">{item.jobRole}</span>
                    </figcaption>
                  </figure>
                  <div className="w-full h-full md:hidden flex justify-center pb-5 text-lg ">
                    <div className="flex flex-col gap-[0.2rem]">
                      <p className="flex gap-5 text-justify text-black/40 ">
                        Employee ID:{" "}
                        <span className="text-black/70">{item.employeeId}</span>
                      </p>
                      <p className="flex gap-5 text-black/40 ">
                        Gender:{" "}
                        <span className="text-black/70">{item.gender}</span>
                      </p>
                      <p className="flex gap-5 text-black/40 ">
                        Age:{" "}
                        <span className="text-black/70">{item.age} yrs</span>
                      </p>
                      <p className="flex gap-5 text-black/40 ">
                        Department:{" "}
                        <span className="text-black/70">{item.department}</span>
                      </p>
                      <p className="flex gap-5 text-black/40 ">
                        Email:{" "}
                        <span className="text-black/70">{item.email}</span>
                      </p>
                      <p className="flex gap-5 text-black/40 ">
                        Phone Number:{" "}
                        <span className="text-black/70">
                          {item.phoneNumber}
                        </span>
                      </p>
                      <p className="flex gap-5 text-black/40 ">
                        Years of service:{" "}
                        <span className="text-black/70">
                          {item.yearsOfService} yrs
                        </span>
                      </p>
                      <p className="flex gap-5 text-black/40 ">
                        Tax cut:
                        <span className="text-black/70">{item.taxPolicy}%</span>
                      </p>
                      <p className="flex gap-5 text-black/40 ">
                        Base Salary:{" "}
                        <span className="text-black/70">
                          ₦{item.monthlyBasePay}
                        </span>
                      </p>
                      <p className="flex gap-5 text-black/40 ">
                        Account Number:{" "}
                        <span className="text-black/70">
                          {item.accountNumber}
                        </span>
                      </p>
                      <p className="flex gap-5 text-black/40 ">
                        Bank Name:{" "}
                        <span className="text-black/70">
                          {titleCase(item.bank)} Bank
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="h-full w-[55%]  md:flex hidden flex-col lg:gap-[0.2rem] pb-3">
                    <p className="flex gap-2 text-justify text-black/40 ">
                      Employee ID:{" "}
                      <span className="text-black/70">{item.employeeId}</span>
                    </p>
                    <p className="flex gap-5 text-black/40 ">
                      Gender:{" "}
                      <span className="text-black/70">{item.gender}</span>
                    </p>
                    <p className="flex gap-5 text-black/40 ">
                      Age: <span className="text-black/70">{item.age} yrs</span>
                    </p>
                    <p className="flex gap-5 text-black/40 ">
                      Department:{" "}
                      <span className="text-black/70">{item.department}</span>
                    </p>
                    <p className="flex gap-5 text-black/40 ]">
                      Email:{" "}
                      <span className="text-black/70 md:w-1/5">
                        {item.email}
                      </span>
                    </p>
                    <p className="flex gap-5 text-black/40 ">
                      Phone Number:{" "}
                      <span className="text-black/70">{item.phoneNumber}</span>
                    </p>
                    <p className="flex gap-5 text-black/40 ">
                      Years of service:{" "}
                      <span className="text-black/70">
                        {item.yearsOfService} yrs
                      </span>
                    </p>
                    <p className="flex gap-5 text-black/40 ">
                      Tax cut:
                      <span className="text-black/70">{item.taxPolicy}%</span>
                    </p>
                    <p className="flex gap-5 text-black/40 ">
                      Base Salary:{" "}
                      <span className="text-black/70">
                        ₦{item.monthlyBasePay}
                      </span>
                    </p>
                    <p className="flex gap-5 text-black/40 ">
                      Account Number:{" "}
                      <span className="text-black/70">
                        {item.accountNumber}
                      </span>
                    </p>
                    <p className="flex gap-5 text-black/40 ">
                      Bank Name:{" "}
                      <span className="text-black/70">
                        {titleCase(item.bank)} Bank
                      </span>
                    </p>
                  </div>
                </div>
                <div className="w-full lg:w-[20%] md:items-start justify-center pb-5 flex lg:justify-center">
                  <div className="card_child flex lg:w-full md:border-b lg:border-none justify-between lg:justify-center md:w-full w-4/5 pt-5 md:justify-between lg:gap-10">
                    {/* <button className="transition duration-1000">
                      <AiFillEdit className="text-2xl hover:text-black/50 transition duration-300" />
                    </button> */}
                    <button>
                      <AiFillDelete
                        onClick={() => deleteEmployee(item._id)}
                        className="text-2xl hover:text-[red] transition duration-300"
                      />
                    </button>
                    <Link
                      to="/employees"
                      className="text-xl hover:text-black/50 transition duration-300"
                    >
                      <GrClose />
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </Link>
      );
    });

  return (
    <div
      className={`${
        employeeData?.length > 1
          ? `${employeeData?.length < 5 ? "h-screen " : "h-full"}`
          : "h-screen"
      } w-full `}
    >
      {filteredUsers}

      <AddNewEmployee />
      <div className="w-full h-full pt-[3%] overflow-hidden">
        <div className="flex justify-center">
          <div className="w-[90%] h-full flex md:flex-row flex-col justify-between md:items-center">
            <div className="w-[50%]">
              <h1 className="font-bold text-[28px] md:text-[32px]">
                Employees{`(${totalNumberOfEmployees})`}
              </h1>
            </div>
            <div className="flex gap-3 w-full md:mt-0 mt-5 md:w-[60%]">
              <input
                type="text"
                placeholder="Search names/jobs/gender..."
                name="employee"
                value={employee}
                onChange={handleEmployeeChange}
                className="w-3/5 md:w-[65%] py-2 px-5 outline-none rounded-md md:rounded-lg"
              />
              <button
                onClick={createCard}
                className="w-2/5 md:w-[35%] text-white bg-[#2E3192]  hover:bg-[#595FFF] flex items-center justify-center gap-1 rounded-md md:rounded-lg"
              >
                <IoIosAdd className="text-white text-lg md:text-2xl" />
                <span>Create a card</span>
              </button>
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="w-full flex justify-center">
            <div className="bg-[#ffffff] w-[90%] py-[10%] mt-10 rounded-xl md:shadow-black/20 md:shadow-md">
              <p className="flex items-center justify-center text-gray-500 text-sm">
                <SyncLoader color="#430359" />
              </p>
            </div>
          </div>
        )}
        {error && (
          <div className="w-full flex justify-center">
            <div className="bg-[#ffffff] w-[90%] py-[10%] mt-10 rounded-xl md:shadow-black/20 md:shadow-md">
              <p className="flex items-center justify-center text-gray-500 text-sm">
                Error occurred while loading data..
              </p>
            </div>
          </div>
        )}

        <div className="w-full flex justify-center mt-10">
          <div className="w-[90%] lg:gap-x-10 gap-y-10 grid grid-cols-1 md:grid-cols-2">
            {employeeData
              ?.slice(0, firstHalf)
              .filter(
                (item) =>
                  item.name.toLowerCase().includes(employee.toLowerCase()) ||
                  item.gender.toLowerCase().includes(employee.toLowerCase()) ||
                  item.jobRole.toLowerCase().includes(employee.toLowerCase())
              )
              .map((item) => {
                return (
                  <div key={item._id} className="flex justify-center w-full">
                    <Link
                      to={`${item.name}`}
                      className="flex md:flex-row justify-between flex-col bg-white card_parent w-[97%] md:w-[95%]  lg:w-[100%]  py-5 px-3 rounded-xl  transition duration-500 hover:text-sm hover:font-semibold cursor-pointer"
                    >
                      <div className="flex md:flex-row flex-col  w-full md:w-[80%] items-start gap-5">
                        <div className="w-full h-full md:hidden flex justify-center">
                          <figure className="w-[50%] h-full ">
                            <img
                              src={item.profileImage}
                              alt={item.name}
                              className="w-full h-full"
                            />
                          </figure>
                        </div>
                        <figure className="lg:w-3/5 md:flex hidden lg:h-4/5 md:w-2/5 md:h-2/5">
                          <img
                            src={item.profileImage}
                            alt={item.name}
                            className="w-full h-full"
                          />
                        </figure>
                        <div className="w-full h-full flex justify-center">
                          <div className="flex flex-col gap-3 text-lg md:text-[16px]">
                            <p className="flex gap-5 text-black/40">
                              Name:
                              <span className="text-black/70">
                                {titleCase(item.name)}
                              </span>
                            </p>
                            <p className="flex gap-5 text-justify text-black/40 ">
                              Employee ID:{" "}
                              <span className="text-black/70">
                                {item.employeeId}
                              </span>
                            </p>
                            <p className="flex gap-5 text-black/40">
                              Gender:
                              <span className="text-black/70">
                                {item.gender}
                              </span>
                            </p>
                            <p className="flex gap-5 text-justify text-black/40 ">
                              Role:
                              <span className="text-black/70 ">
                                {item.jobRole}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="card_child flex items-start justify-center md:justify-end gap-5 md:gap-3">
                        {/* <Link to="#" className="transition duration-1000">
                          <AiFillEdit className="md:text-[1.3rem] text-[2rem] hover:text-black/50 transition duration-300" />
                        </Link> */}
                        <Link to="#">
                          <button onClick={() => deleteEmployee(item._id)}>
                            <AiFillDelete className="md:text-[1.3rem] text-[1.8rem] hover:text-[red] transition duration-300" />
                          </button>
                        </Link>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
        {employeeData?.length > 6 && (
          <div className="flex justify-center my-5">
            <button
              className="text-white bg-[#2E3192] py-2 px-6 rounded-lg"
              onClick={showMore}
            >
              {firstHalf === employeeData.length ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

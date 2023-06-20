import React, { useContext, useState } from "react";
import { myContext } from "../ContextAPI";
import { IoIosAdd } from "react-icons/io";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { titleCase } from "../UTILS/Title";
import { Link, useParams } from "react-router-dom";
import { GrClose } from "react-icons/gr";

export const Employees_Database = () => {
  const { employeeData, employeeIsLoading, deleteEmployee } =
    useContext(myContext);
  const totalNumberOfEmployees = employeeData.reduce((sum) => sum + 1, 0);
  const [employee, setEmployee,] = useState("");

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
  console.log(employee);

  const [createNewCard, setCreateNewCard] = useState(false);

  const createCard = () => {
    setCreateNewCard(true);
  };

  const addPhoto = () => {
    document.getElementById("profile2").click();
  };

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    id: "",
    gender: "",
    age: "",
    department: "",
    email: "",
    number: "",
    yos: "",
    tax: "",
    salary: "",
    bank: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleProfilePhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageUrl = reader.result;

      setNewEmployee((state) => ({
        ...state,
        image: imageUrl,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const submitCard = (e) => {
    e.preventDefault();
    console.log(newEmployee);
  };



  // console.log(employeeID);

  const { more_details } = useParams();
  const filteredUsers = employeeData
    .filter((user) => user.name === more_details)
    .map((item) => {
      return (
        <Link
          to="/employees"
          key={item._id}
          className="fixed w-screen h-full flex justify-center items-center bg-gray-900 backdrop-blur-sm bg-opacity-50"
        >
          <div className="w-[83%] h-[90%] overflow-hidden">
            <div className="flex justify-center items-center w-4/5 h-4/5">
              <Link
                to="#"
                className="flex bg-white card_parent w-[85%] h-[70%] px-5 rounded-xl shadow-md shadow-black/10 hover:shadow-xl hover:shadow-black/50  transition duration-500 "
              >
                <div className="flex w-[85%] items-start pt-5 gap-5">
                  <figure className="w-[45%] h-[75%]">
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
                  <div className="flex flex-col gap-[0.2rem]">
                    <p className="flex gap-5 text-justify text-black/40 ">
                      Employee ID:{" "}
                      <span className="text-black/70">
                        {item._id.substring(0, 8)}
                      </span>
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
                    <p className="flex gap-5 text-black/40 ">
                      Email: <span className="text-black/70">{item.email}</span>
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
                <div className="card_child flex items-start pt-5 gap-5">
                  <button className="transition duration-1000">
                    <AiFillEdit className="text-2xl hover:text-black/50 transition duration-300" />
                  </button>
                  <button>
                    <AiFillDelete
                      onClick={deleteEmployee}
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
              </Link>
            </div>
          </div>
        </Link>
      );
    });

  return (
    <div className="w-full h-full">
      {filteredUsers}

      {createNewCard ? (
        <div className="w-[90%] h-full flex justify-center items-center fixed bg-black/20 backdrop-blur-md">
          <form onSubmit={submitCard}>
            <input
              type="file"
              accept="image/*"
              id="profile2"
              name="image"
              className="hidden"
              onChange={handleProfilePhoto}
            />
          </form>
          <div className="flex justify-center gap-10  px-10 items-center w-3/5 bg-white h-2/4 rounded-lg shadow-black/40 ml-[-5%] shadow-xl">
            {newEmployee.image ? (
              <div className="w-1/5 ">
                <figure
                  className="flex h-full w-full rounded-full cursor-pointer"
                  onClick={addPhoto}
                >
                  <img
                    src={newEmployee.image}
                    className="w-full h-full rounded-full"
                  />
                </figure>
                <form onSubmit={submitCard}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    className="flex w-full text-center outline-none border-black/40 font-medium text-md border-b mt-3"
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    name="role"
                    className="flex w-full text-center outline-none border-black/40 font-medium border-b mt-3"
                    onChange={handleInputChange}
                  />
                </form>
              </div>
            ) : (
              <div className="w-1/5 ">
                <div
                  className="flex  w-full  rounded-full bg-black/20"
                  onClick={addPhoto}
                >
                  <IoIosAdd className="justify-center flex w-full items-center h-full text-black/5 cursor-pointer" />
                </div>
                <form onSubmit={submitCard}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    className="flex w-full text-center outline-none border-black/40 font-medium text-md border-b mt-3"
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    name="job"
                    className="flex w-full text-center outline-none border-black/40 font-medium border-b mt-3"
                    onChange={handleInputChange}
                  />
                </form>
              </div>
            )}

            <div className="w-4/5 flex ">
              <form className="grid grid-cols-2 gap-x-5" onSubmit={submitCard}>
                <span className="flex items-center gap-2 text-justify">
                  <label className="h-full">Employee ID :</label>
                  <input
                    type="text"
                    name="id"
                    className="flex h-full w-2/5  text-center outline-none border-black/40 font-medium border-b mt-[-10%]"
                    onChange={handleInputChange}
                  />
                </span>
                <span className="flex items-center gap-2">
                  <label className="h-full">Gender :</label>
                  <input
                    type="text"
                    name="gender"
                    className="flex h-full w-2/5 text-center outline-none border-black/40 font-medium border-b mt-[-10%]"
                    onChange={handleInputChange}
                  />
                </span>
                <span className="flex items-center gap-2 mt-3">
                  <label className="h-full">Age :</label>
                  <input
                    type="text"
                    name="age"
                    className="flex h-full w-2/5 text-center outline-none border-black/40 font-medium border-b mt-[-10%]"
                    onChange={handleInputChange}
                  />
                </span>
                <span className="flex items-center gap-2 mt-2">
                  <label className="h-full">Department :</label>
                  <input
                    type="text"
                    name="department"
                    className="flex h-full w-2/5 text-center outline-none border-black/40 font-medium border-b mt-[-10%]"
                    onChange={handleInputChange}
                  />
                </span>
                <span className="flex items-center gap-2 mt-2">
                  <label className="h-full">Email :</label>
                  <input
                    type="text"
                    name="email"
                    className="flex h-full w-2/5 text-center outline-none border-black/40 font-medium border-b mt-[-10%]"
                    onChange={handleInputChange}
                  />
                </span>
                <span className="flex items-center gap-2 mt-2">
                  <label className="h-full">Phone Number :</label>
                  <input
                    type="number"
                    name="number"
                    className="flex h-full w-2/5 text-center outline-none border-black/40 font-medium border-b mt-[-7%]"
                    onChange={handleInputChange}
                  />
                </span>
                <span className="flex items-center gap-2 mt-2">
                  <label className="h-full">YOS :</label>
                  <input
                    type="number"
                    name="yos"
                    className="flex h-full w-2/5 text-center outline-none border-black/40 font-medium border-b mt-[-6%]"
                    onChange={handleInputChange}
                  />
                </span>
                <span className="flex items-center gap-2 mt-2">
                  <label className="h-full">Tax cut :</label>
                  <input
                    type="number"
                    name="tax"
                    className="flex h-full w-2/5 text-center outline-none border-black/40 font-medium border-b mt-[-7%]"
                    onChange={handleInputChange}
                  />
                </span>
                <span className="flex items-center gap-2 mt-2">
                  <label className="h-full">Base Salary :</label>
                  <input
                    type="number"
                    name="salary"
                    className="flex h-full w-2/5 text-center outline-none border-black/40 font-medium border-b mt-[-7%]"
                    onChange={handleInputChange}
                  />
                </span>
                <span className="flex items-center gap-2 mt-2 ">
                  <label className="h-full">Bank :</label>
                  <input
                    type="text"
                    name="bank"
                    className="flex h-full w-2/5 text-center outline-none border-black/40 font-medium border-b mt-[-7%] bg-transparent"
                    onChange={handleInputChange}
                  />
                </span>
                <button className="bg-[#2E3192] text-white transition duration-300 hover:bg-[#090d75] font-medium mt-10 w-[70%] py-1 rounded-md">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="w-full h-full pt-[3%] overflow-hidden">
        <div className="flex justify-center">
          <div className="w-[90%] h-full flex justify-between items-center">
            <div className="w-[50%]">
              <h1 className="font-bold text-[32px]">
                Employees{`(${totalNumberOfEmployees})`}
              </h1>
            </div>
            <div className="flex gap-3 w-[60%]">
              <input
                type="text"
                placeholder="Search names/jobs/gender..."
                name="employee"
                value={employee}
                onChange={handleEmployeeChange}
                className="w-[65%] py-2 px-5 outline-none rounded-lg"
              />
              <button
                onClick={createCard}
                className="w-[35%] text-white bg-[#430359] flex items-center justify-center gap-1 rounded-lg"
              >
                <IoIosAdd className="text-white text-2xl" />
                <span>Create a card</span>
              </button>
            </div>
          </div>
        </div>

        <p className="mt-20">{employeeIsLoading}</p>
        <div className="w-full h-full flex justify-center">
          <div className="w-full h-full grid grid-cols-2">
            {employeeData
              .slice(0, firstHalf)
              .filter(
                (item) =>
                  item.name.toLowerCase().includes(employee.toLowerCase()) ||
                  item.gender.toLowerCase().includes(employee.toLowerCase()) ||
                  item.jobRole.toLowerCase().includes(employee.toLowerCase())
              )
              .map((item) => {
                return (
                  <div
                    key={item._id}
                    className="flex justify-center w-full h-[40vh]"
                  >
                    <Link
                      to={`${item.name}`}
                      className="flex bg-white card_parent w-[85%] h-4/5 px-5 rounded-xl shadow-md shadow-black/40   hover:shadow-black/50 hover:shadow-xl  transition duration-500 hover:text-sm hover:font-semibold cursor-pointer"
                    >
                      <div className="flex w-[80%] items-start pt-5 gap-5">
                        <figure className="w-[25%] h-2/5">
                          <img
                            src={item.profileImage}
                            alt={item.name}
                            className="w-full h-full"
                          />
                        </figure>
                        <div className="flex flex-col gap-6">
                          <p className="flex gap-5 text-black/40">
                            Name:
                            <span className="text-black/70">
                              {titleCase(item.name)}
                            </span>
                          </p>
                          <p className="flex gap-5 text-justify text-black/40 ">
                            Employee ID:{" "}
                            <span className="text-black/70">
                              {item._id.substring(0, 5)}
                            </span>
                          </p>
                          <p className="flex gap-5 text-black/40">
                            Gender:
                            <span className="text-black/70">{item.gender}</span>
                          </p>
                          <p className="flex gap-5 text-justify text-black/40 ">
                            Role:
                            <span className="text-black/70 ">
                              {item.jobRole}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="card_child flex items-start pt-5 gap-5">
                        <button className="transition duration-1000">
                          <AiFillEdit className="text-2xl hover:text-black/50 transition duration-300" />
                        </button>
                        <Link to="#">
                          <AiFillDelete className="text-2xl hover:text-[red] transition duration-300" />
                        </Link>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
        {employeeData.length > 6 && (
          <div className="flex justify-center my-5">
            <button
              className="text-white bg-[#430359] py-2 px-6 rounded-lg"
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

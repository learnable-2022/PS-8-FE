import React, { useContext,  useState } from "react";
import request from "axios";
import { myContext } from "../ContextAPI";
import { IoIosAdd } from "react-icons/io";
import { GrClose } from "react-icons/gr";


export const AddNewEmployee = () => {
  const { createNewCard, closeForm } = useContext(myContext);

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

  const newEmployeeID = newEmployee.id;
  // const token = window.localStorage.getItem("HR_access_token")
  console.log(newEmployeeID);
  const addNewEmployee = async () => {
    try {
      const response = await request.put(
        `/employees/${newEmployeeID}`,
        newEmployee
      );
      if (response.data) {
        console.log("New employee added successfully ");
      }
    } catch (error) {
      console.log("Error adding New employee", error);
    }
  };

  return (
    <div>
      {createNewCard ? (
        <div
          to="/employees"
          className="md:w-[90%] w-full bg-opacity-50 h-full flex md:flex-row flex-col justify-center items-center fixed bg-black/20 backdrop-blur-md"
        >
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
          <div className="flex md:flex-row flex-col justify-center gap-10 px-10 items-center  md:w-[75%] bg-white py-10 rounded-lg ">
            {newEmployee.image ? (
              <div className="w-3/4 md:w-1/5 ">
                <GrClose
                  onClick={closeForm}
                  className="mb-5  md:mt-0 flex w-full justify-end ml-[60%]  text-xl md:hidden"
                />
                <figure
                  className="flex w-full rounded-full cursor-pointer"
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
                    className="flex w-full text-center outline-none border-black/40 font-medium text-lg md:text-md border-b mt-3"
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    name="role"
                    className="flex w-full text-center outline-none border-black/40  font-medium border-b mt-3"
                    onChange={handleInputChange}
                  />
                </form>
              </div>
            ) : (
              <div className="w-2/4 md:w-1/5  md:mt-0">
                <GrClose
                  onClick={closeForm}
                  className="mb-5 flex w-full justify-end ml-[90%]  text-2xl md:hidden"
                />
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
                    className="flex w-full text-center outline-none border-black/40 font-medium text-lg md:text-md border-b mt-3"
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

            <div className="md:w-[90%] w-full flex ">
              <form
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-5"
                onSubmit={submitCard}
              >
                <span className="flex items-center gap-2 text-justify w-full">
                  <label className="h-full">Employee ID :</label>
                  <input
                    type="text"
                    name="id"
                    className="flex h-full md:w-2/5 w-3/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    onChange={handleInputChange}
                  />
                </span>
                <span className="flex items-center gap-x-2">
                  <label className="h-full">Gender :</label>
                  <input
                    type="text"
                    name="gender"
                    className="flex h-full md:w-2/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    onChange={handleInputChange}
                  />
                </span>
                <span className="flex items-center gap-2 mt-3">
                  <label className="h-full">Age :</label>
                  <input
                    type="text"
                    name="age"
                    className="flex h-full md:w-2/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    onChange={handleInputChange}
                  />
                </span>
                <span className="flex items-center gap-2 mt-2">
                  <label className="h-full">Department :</label>
                  <input
                    type="text"
                    name="department"
                    className="flex h-full md:w-2/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    onChange={handleInputChange}
                  />
                </span>
                <span className="flex items-center gap-2 mt-2">
                  <label className="h-full">Email :</label>
                  <input
                    type="text"
                    name="email"
                    className="flex h-full md:w-2/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    onChange={handleInputChange}
                  />
                </span>
                <span className="flex items-center gap-2 mt-2">
                  <label className="h-full">Phone Number :</label>
                  <input
                    type="number"
                    name="number"
                    className="flex h-full md:w-2/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    onChange={handleInputChange}
                  />
                </span>
                <span className="flex items-center gap-2 mt-2">
                  <label className="h-full">YOS :</label>
                  <input
                    type="number"
                    name="yos"
                    className="flex h-full md:w-2/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    onChange={handleInputChange}
                  />
                </span>
                <span className="flex items-center gap-2 mt-2">
                  <label className="h-full">Tax cut :</label>
                  <input
                    type="number"
                    name="tax"
                    className="flex h-full md:w-2/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    onChange={handleInputChange}
                  />
                </span>
                <span className="flex items-center gap-2 mt-2">
                  <label className="h-full">Base Salary :</label>
                  <input
                    type="number"
                    name="salary"
                    className="flex h-full md:w-2/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    onChange={handleInputChange}
                  />
                </span>
                <span className="flex items-center gap-2 mt-2 ">
                  <label className="h-full">Bank :</label>
                  <input
                    type="text"
                    name="bank"
                    className="flex h-full md:w-2/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    onChange={handleInputChange}
                  />
                </span>
                <button
                  onClick={addNewEmployee}
                  className="bg-[#2E3192] text-white transition duration-300 hover:bg-[#090d75] font-medium mt-10 w-[70%] py-1 rounded-md"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

import { useContext, useEffect } from "react";
import request from "../axios";
import { myContext } from "../ContextAPI";
import { IoIosAdd } from "react-icons/io";
import { GrClose } from "react-icons/gr";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newEmployeeValidation } from "../Schemas/employee_schema";
import { toast } from "react-toastify";
export const AddNewEmployee = () => {
  const { createNewCard, closeForm } = useContext(myContext);

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(newEmployeeValidation),
  });

  const addPhoto = () => {
    document.getElementById("profile2").click();
  };

  // const [newEmployee, setNewEmployee] = useState("");

  // const handleProfilePhoto = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     const imageUrl = reader.result;

  //     setNewEmployee((state) => ({
  //       ...state,
  //       image: imageUrl,
  //     }));
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const selectedImage = watch("profileImage");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setValue("profileImage", reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const submitCard = async (data) => {
    try {
      const response = await request.post("/employees", data, {
        Headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (response.data) {
        toast.success(response.data.message);
      } else {
        console.log(response);
        toast.error(response);
      }
    } catch (error) {
      console.log("Error adding New employee", error);
    }

  };

  return (
    <div className="">
      {createNewCard ? (
        <div className="md:w-[90%] h-full w-full bg-opacity-50 flex md:flex-row flex-col justify-center fixed bg-black/20 backdrop-blur-md overflow-y-scroll">
          <form onSubmit={submitCard}>
            <input
              type="file"
              accept="image/*"
              id="profile2"
              // {...register("profileImage")}
              onChange={handleImageUpload}
              className="hidden"
            />
          </form>
          <div className="w-full h-[70%] -mt-40 md:mt-3 md:h-[85%] flex justify-center">
            <div className="w-[90%] md:w-2/5 bg-white md:px-10 px-5 py-3 rounded-xl">
              <div className="w-full flex gap-5  items-center">
                {!selectedImage ? (
                  <div
                    className="flex w-[50%] md:w-[30%] h-1/5 rounded-full bg-black/20"
                    onClick={addPhoto}
                  >
                    <IoIosAdd className="justify-center flex w-full items-center h-full text-black/5 cursor-pointer" />
                  </div>
                ) : (
                  <figure className="flex w-[50%] md:w-[30%] h-1/5 rounded-full cursor-pointer">
                    <img
                      src={selectedImage}
                      className="w-full h-full rounded-full"
                    />
                  </figure>
                )}
                <form onSubmit={submitCard}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("name")}
                    className="flex w-full text-center outline-none border-black/40 font-medium text-lg md:text-md border-b mt-3"
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    {...register("jobRole")}
                    className="flex w-full text-center outline-none border-black/40  font-medium border-b mt-3"
                  />
                </form>
                <GrClose
                  onClick={closeForm}
                  className="mb-5 md:text-xl ml-20 -mt-10 cursor-pointer text-4xl "
                />
              </div>

              <div className="md:w-full w-full ">
                <form
                  className="w-full mt-3 md:mt-10 flex flex-col gap-1"
                  onSubmit={handleSubmit(submitCard)}
                >
                  <span className="flex items-center gap-2 text-justify w-full">
                    <label className="h-full">Employee ID :</label>
                    <input
                      type="text"
                      {...register("employeeId")}
                      className="flex h-full md:w-2/5 w-3/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    />
                  </span>
                  <span className="flex items-center gap-x-2">
                    <label className="h-full">Gender :</label>
                    <input
                      type="text"
                      {...register("gender")}
                      className="flex h-full md:w-2/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    />
                  </span>
                  <span className="flex items-center gap-2 mt-3">
                    <label className="h-full">Age :</label>
                    <input
                      type="text"
                      {...register("age")}
                      className="flex h-full md:w-2/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    />
                  </span>
                  <span className="flex items-center gap-2 mt-2">
                    <label className="h-full">Department :</label>
                    <input
                      type="text"
                      {...register("department")}
                      className="flex h-full md:w-2/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    />
                  </span>
                  <span className="flex items-center gap-2 mt-2">
                    <label className="h-full">Email :</label>
                    <input
                      type="text"
                      {...register("email")}
                      className="flex h-full md:w-2/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    />
                  </span>
                  <span className="flex items-center gap-2 mt-2">
                    <label className="h-full">Phone Number :</label>
                    <input
                      type="number"
                      {...register("phoneNumber")}
                      className="flex h-full md:w-2/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    />
                  </span>
                  <span className="flex items-center gap-2 mt-2">
                    <label className="h-full">YOS :</label>
                    <input
                      type="number"
                      {...register("yearsOfService")}
                      className="flex h-full md:w-2/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    />
                  </span>
                  <span className="flex items-center gap-2 mt-2">
                    <label className="h-full">Tax cut :</label>
                    <input
                      type="number"
                      {...register("taxPolicy")}
                      className="flex h-full md:w-2/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    />
                  </span>
                  <span className="flex items-center gap-2 mt-2">
                    <label className="h-full">Base Salary :</label>
                    <input
                      type="number"
                      {...register("monthlyBasePay")}
                      className="flex h-full md:w-2/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    />
                  </span>
                  <span className="flex items-center gap-2 mt-2 ">
                    <label className="h-full">Bank :</label>
                    <input
                      type="text"
                      {...register("bank")}
                      className="flex h-full md:w-2/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    />
                  </span>
                  <span className="flex items-center gap-2 mt-2 ">
                    <label className="h-full">Account Number :</label>
                    <input
                      type="text"
                      {...register("accountNumber")}
                      className="flex h-full md:w-2/5 text-center outline-none border-black/40 font-medium border-b md:mt-[-3%] bg-transparent"
                    />
                  </span>
                  <button className="bg-[#2E3192] text-white transition duration-300 hover:bg-[#090d75] font-medium w-full py-1 rounded-md mt-10 md:mt-1">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

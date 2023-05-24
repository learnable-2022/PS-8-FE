import { useState, useContext } from "react";
import { myContext } from "../ContextAPI";
import { Link } from "react-router-dom";
export const HR_SignIn = () => {
  const { handleSignIn, handleSubmit, password, email } = useContext(myContext);

  return (
    <div className="w-full">
      <div className="flex justify-center w-full mt-20">
        <div className="w-full">
          <div className="flex justify-center">
            <figure className="w-[5%] ">
              <img
                src="/public/Images/Logo (1).jpg"
                alt="PayMe"
                className="w-full h-full"
              />
            </figure>
          </div>
          <h2 className="flex justify-center mt-5 text-4xl text-[#1A1A1A] font-semibold">
            Welcome back
          </h2>
          <div className="flex justify-center w-full">
            <div className="w-2/5 border-black/10 mt-10 rounded-lg border flex justify-center">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-[90%] mt-10"
              >
                <label
                  htmlFor="email"
                  className="mb-1 text-[#1A1A1A] font-semibold"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleSignIn}
                  className="bg-black/5 py-2  rounded-lg px-5 mb-5"
                />
                <label
                  htmlFor="email"
                  className="mb-1 text-[#1A1A1A] font-semibold"
                >
                  password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  className="bg-black/5  py-2  rounded-lg px-5 mb-7"
                  onChange={handleSignIn}
                />

                <button className="bg-[#430359] py-2 rounded-lg mb-10 text-white font-bold">
                  <Link to="/payroll_dashboard">Sign In </Link>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

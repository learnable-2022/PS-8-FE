import { useState, useContext, useEffect } from "react";
import { myContext } from "../ContextAPI";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
 import { ToastContainer } from 'react-toastify';


export const HR_SignIn = () => {
  const {
    handleSignIn,
    handleSubmit,
    handleClick,
    password,
    email,
    showPassword,
    revealPassword,
    isPending,
  } = useContext(myContext);

  return (
    <div className="w-full">
      <ToastContainer />
      <div className="flex justify-center w-full mt-20">
        <div className="w-full">
          <div className="flex justify-center">
            <figure className="w-[5%] ">
              <img
                src="/Images/Logo.png"
                alt="PayMe"
                className="w-full h-full"
              />
            </figure>
          </div>
          <h2 className="flex justify-center mt-5 text-4xl text-[#1A1A1A] font-semibold">
            Welcome back
          </h2>
          <div className="flex justify-center w-full">
            <div className="w-[30%] border-[#C2C2C2] mt-10 rounded-lg border flex justify-center">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-[90%] mt-5"
              >
                <h2 className="font-bold text-[#1A1A1A] text-[28px] mb-5">
                  Sign in
                </h2>

                <label
                  htmlFor="email"
                  className="mb-1 text-[#1A1A1A] font-medium"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleSignIn}
                  className="bg-[#F5F5F5] py-2 outline-none  rounded-lg px-3 mb-5 text-black/60"
                />
                <label
                  htmlFor="password"
                  className="mb-1 text-[#1A1A1A] font-medium"
                >
                  Password
                </label>
                <div className="flex mb-7">
                  <input
                    type={revealPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    className="bg-[#F5F5F5] w-full py-2 outline-none  rounded-lg px-3 text-black/60"
                    onChange={handleSignIn}
                  />

                  {revealPassword ? (
                    <AiFillEyeInvisible
                      onClick={showPassword}
                      className="text-xl cursor-pointer -ml-[10%] flex h-full items-center"
                    />
                  ) : (
                    <AiFillEye
                      onClick={showPassword}
                      className="text-xl cursor-pointer -ml-[10%] flex h-full items-center"
                    />
                  )}
                </div>
                <button
                  className={`bg-[#430359] hover:bg-[#6c148a] transition duration-300 py-2 rounded-lg mb-5 text-white font-bold disabled:opacity-40 ${isPending && "cursor-not-allowed"}`}
                  disabled={!email || !password}
                  onClick={handleClick}
                >
                  {isPending ? "Loading..." : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

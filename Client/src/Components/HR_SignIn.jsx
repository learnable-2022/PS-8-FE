import { useState, useContext, useEffect } from "react";
import { myContext } from "../ContextAPI";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
 import { ToastContainer } from 'react-toastify';


export const HR_SignIn = () => {
  const {
    handleSignIn,
    handleSubmit,
    password,
    email,
    showPassword,
    revealPassword,
  } = useContext(myContext);

  return (
    <div className="w-full">
      <ToastContainer/>
      <div className="flex justify-center w-full mt-20">
        <div className="w-full">
          <div className="flex justify-center">
            <figure className="w-[5%] ">
              <img
                src="/Images/Logo (1).jpg"
                alt="PayMe"
                className="w-full h-full"
              />
            </figure>
          </div>
          <h2 className="flex justify-center mt-5 text-4xl text-[#1A1A1A] font-semibold">
            Welcome back
          </h2>
          <div className="flex justify-center w-full">
            <div className="w-2/5 border-black/10 shadow-black/10 shadow-lg mt-10 rounded-lg border flex justify-center">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-[80%] mt-10"
              >
                <h2 className="font-semibold text-[#1A1A1A] text-xl mb-5">
                  Sign in
                </h2>

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
                  className="bg-black/10 py-2 outline-none  rounded-lg px-3 mb-5 text-black/60"
                />
                <label
                  htmlFor="password"
                  className="mb-1 text-[#1A1A1A] font-semibold"
                >
                  Password
                </label>
                <div className="flex mb-7">
                  <input
                    type={revealPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    className="bg-black/10 w-full py-2 outline-none  rounded-lg px-3 text-black/60"
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
                  className="bg-[#430359] py-2 rounded-lg mb-10 text-white font-bold disabled:opacity-40"
                  disabled={!email || !password}
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

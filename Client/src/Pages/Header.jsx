import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import "../index.css";
const Header = () => {
  return (
    <header className=" bg-[#ffffff] border-b overflow-hidden  fixed px-10 flex items-center w-full">
      <figure className="w-[5%]">
        <img
          src="/public/Images/Logo (1).jpg"
          alt="PayMe"
          className="w-full h-full"
        />
      </figure>

      <div className="ml-auto flex items-center">
        <button className="bg-white text-black px-2 py-2">
          <IoNotificationsOutline className="text-2xl text-black/60" />
        </button>

        <button className="bg-white text-black px-4 py-2">
          <TbLogout className="text-2xl text-black/60" />
        </button>

        <div className="div border-l-[gray-200] border p-3"></div>

        <div className="flex items-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 ">
            <img
              src="/public/Images/image1.jpeg"
              alt="User Avatar"
              className="w-full h-full rounded-full mr-2"
            />
          </div>

          <div className="flex flex-col p-2">
            <span className="text-sm">Richard Stark</span>
            <span className="text-sm text-gray-200">Hr Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

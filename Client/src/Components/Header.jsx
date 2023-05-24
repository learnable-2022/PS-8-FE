import React from 'react'
import { IoNotificationsOutline } from 'react-icons/io5';
import { TbLogout } from 'react-icons/tb';

const Header = () => {
  return (
   
    <header className="bg-white text-black  p-2 flex items-center border-b border-gray-200 h-[10%]">
      <figure className=" w-[10%]">
        <img
          src="/public/Images/Logo (1).jpg"
          alt="PayMe"
          className=" h-auto"
        />
      </figure>

      <div className="ml-auto flex items-center">
        <button className="bg-white text-black px-2 py-2">
          <IoNotificationsOutline />
        </button>

        <button className="bg-white text-black px-2 py-2">
          <TbLogout />
        </button>

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

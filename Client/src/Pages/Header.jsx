import React, { useContext, useState, useEffect } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { HiUserCircle } from "react-icons/hi";
import { NavLink } from "react-router-dom"; // Added NavLink import
import "../index.css";
import { myContext } from "../ContextAPI";
import { toast } from "react-toastify";
import { titleCase } from "../UTILS/Title";
import { Navigate } from "react-router-dom";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { userInfo, processData, isFile } = useContext(myContext);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    setProfileImage(window.localStorage.getItem("payme_profile"));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("payme_profile", profileImage);
  }, [profileImage]);

  const uploadProfile = () => {
    document.getElementById("profile").click();
  };

  const uploadImage = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  const userName = titleCase(userInfo);

  return (
    <header className="bg-[#ffffff] border-b border-[#dbdada] overflow-hidden  fixed px-10 flex items-center w-full">
      <div className="flex justify-between w-full items-center">
        <div className="w-2/5 h-full">
          <figure className="w-[16%] ">
            <img
              src="/public/Images/Logo (1).jpg"
              alt="PayMe"
              className="w-full h-full"
            />
          </figure>
        </div>

        <div className="ml-auto flex items-center justify-end w-3/5">
          <button className="bg-white text-black px-2 py-2 flex justify-end">
            <IoNotificationsOutline className="text-2xl text-black/60" />
          </button>

          <button
            className="bg-white text-black px-4 py-2"  onClick={() => setShowDropdown(!showDropdown)}>
            <TbLogout className="text-2xl text-black/60" />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <NavLink to="">
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#430359] hover:text-[#ffffff]">
                  Logout
                </button>
              </NavLink>
            </div>
          )}

          <div className="div border-l-[gray-200] border p-3"></div>

          <form>
            <input
              type="file"
              accept="image/*"
              id="profile"
              className="hidden"
              onChange={uploadImage}
            />
          </form>
          {profileImage ? (
            <figure
              className="w-[50px] h-[50px] cursor-pointer"
              onClick={uploadProfile}
            >
              <img
                src={profileImage}
                alt="Profile"
                title={userInfo}
                className="w-full h-full rounded-full"
              />
            </figure>
          ) : (
            <HiUserCircle
              className="text-5xl text-black/20 cursor-pointer"
              onClick={uploadProfile}
            />
          )}

          <div className="flex flex-col px-3 ">
            <span className="text-sm">{userName}</span>
            <span className="text-sm text-gray-200">Hr Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

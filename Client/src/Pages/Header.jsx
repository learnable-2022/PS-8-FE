import React, { useContext, useState, useEffect } from "react";
import { TbLogout } from "react-icons/tb";
import ConnectWallet from "./connectWallet";
import { HiUserCircle } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import "../index.css";
import { myContext } from "../ContextAPI";
import { titleCase } from "../UTILS/Title";
import { RxHamburgerMenu } from "react-icons/rx";
const Header = () => {
  const { userInfo, showNavbar, nav } = useContext(myContext);
  const [profileImage, setProfileImage] = useState(null);
  const { username, avatar } = JSON.parse(userInfo);

  useEffect(() => {
    window.localStorage.setItem("payme_profile", avatar);
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

  return (
    <header className="bg-[#ffffff] border-b border-[#dbdada] overflow-hidden px-5  fixed md:px-10 flex items-center w-full">
      <div className="flex justify-between w-full items-center">
        <div onClick={showNavbar}>
          {nav ? (
            <GrClose className="md:hidden text-2xl" />
          ) : (
            <RxHamburgerMenu className="md:hidden text-2xl" />
          )}
        </div>

        <div className="md:w-2/5 h-full">
          <figure className="md:w-[16%] w-[60px]">
            <img src="/Images/Logo.png" alt="PayMe" className="w-full h-full hidden md:flex" />
          </figure>
          <figure className="md:w-[16%] w-[26px] ml-5">
            <img src="/Images/Logo symbol.png" alt="PayMe" className="w-full h-full  md:hidden" />
          </figure>
        </div>

        <div className="flex items-center md:justify-end md:w-3/5">
          <ConnectWallet />

          <div className="div border-l-[gray-200] border p-3 md:flex hidden"></div>

          <form>
            <input
              type="file"
              accept="image/*"
              id="profile"
              className="hidden"
              onChange={uploadImage}
            />
          </form>
          {avatar ? (
            <figure className="w-[50px] h-[50px] cursor-pointer" onClick={uploadProfile}>
              <img
                src={avatar}
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
          {/* <Connect /> */}

          <div className="md:flex flex-col px-3 hidden">
            <span className="text-sm">{titleCase(username)}</span>
            <span className="text-sm text-gray-200">Hr Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

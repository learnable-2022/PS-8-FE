import React from 'react'
import { TbLogout } from "react-icons/tb";
import { IoNotificationsOutline } from "react-icons/io5";
import { Nav_Bar } from './Nav_Bar';
import { Upload } from './Upload';
import Header from './Header';
//import { Navigation } from '../Navigation';
import '../index.css';

export const Payroll_Dashboard = () => {

  return (
    <><header><Header/> </header>
    <main className="flex flex-row flex-grow ">

      <Nav_Bar />

      <Upload />
    </main>
    </>
  );
};

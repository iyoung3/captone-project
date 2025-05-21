import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GoHome, GoCommentDiscussion, GoSignOut } from "react-icons/go";
import { logoutDoctor } from "../services/doctorAuthService";
import {MdChat, MdHomeFilled, MdLogout} from "react-icons/md";

export default function DoctorNavbar() {
  const location = useLocation();

  const handleLogout = () => {
    logoutDoctor();
  };

  return (
    <nav className="fixed bottom-0 container w-full left-1/2 -translate-x-1/2 flex justify-evenly py-4 pb-4 bg-secondary text-white">
      <Link to="/doctor/home" className={'flex flex-col items-center'}>
        <MdHomeFilled size={24}/>
        <span className={'text-xs'}>Beranda</span>
      </Link>
      <Link to="/doctor/login" className={'flex flex-col items-center'} onClick={handleLogout}>
        <MdLogout size={24}/>
        <span className={'text-xs'}>Logout</span>
      </Link>
    </nav>
  );
}

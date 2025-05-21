import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GoHome, GoSearch, GoCommentDiscussion, GoSignOut } from "react-icons/go";
import { FaClipboardList } from "react-icons/fa";
import { logoutUser } from "../services/userAuthService";

export default function UserNavbar() {
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <nav className="fixed bottom-0 container w-full left-1/2 -translate-x-1/2 flex justify-evenly bg-white py-4 border-t pb-4">
      <Link to="/user/home" className={`flex flex-col items-center`}>
        <GoHome />
        <span className={'text-xs'}>Beranda</span>
      </Link>
      <Link to="/user/doctor-info/:doctorId" className={`flex flex-col items-center`}>
        <GoSearch />
        <span className={'text-xs'}>Dokter</span>
      </Link>
      <Link to="/user/chat" className={`flex flex-col items-center`}>
        <GoCommentDiscussion />
        <span className={'text-xs'}>Chat</span>
      </Link>
      <Link to="/user/referrals" className={`flex flex-col items-center`}>
        <FaClipboardList />
        <span className={'text-xs'}>Rujukan</span>
      </Link>
      <Link to="/user/login" onClick={handleLogout} className={' flex flex-col items-center'}>
        <GoSignOut />
        <span className={'text-xs'}>Logout</span>
      </Link>
    </nav>
  );
}

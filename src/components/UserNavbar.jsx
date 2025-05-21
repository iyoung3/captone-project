import React from "react";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../services/userAuthService";
import {MdChat, MdDocumentScanner, MdHomeFilled, MdLogout} from "react-icons/md";

export default function UserNavbar() {

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <nav className="fixed bottom-0 container w-full left-1/2 -translate-x-1/2 flex justify-evenly bg-primary text-white py-4 border-t pb-4">
      <Link to="/user/home" className={`flex flex-col items-center`}>
        <MdHomeFilled  size={24}/>
        <span className={'text-xs'}>Beranda</span>
      </Link>
      <Link to="/user/chat" className={`flex flex-col items-center`}>
        <MdChat  size={24}/>
        <span className={'text-xs'}>Chat</span>
      </Link>
      <Link to="/user/referrals" className={`flex flex-col items-center`}>
        <MdDocumentScanner  size={24}/>
        <span className={'text-xs'}>Rujukan</span>
      </Link>
      <Link to="/user/login" onClick={handleLogout} className={' flex flex-col items-center'}>
        <MdLogout  size={24}/>
        <span className={'text-xs'}>Logout</span>
      </Link>
    </nav>
  );
}

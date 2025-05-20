import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GoHome, GoSearch, GoCommentDiscussion, GoSignOut } from "react-icons/go";
import { FaClipboardList } from "react-icons/fa";
import { logoutUser } from "../services/userAuthService";
import "../styles/UserNavbar.css";

export default function UserNavbar() {
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <nav className="bottom-navbar">
      <Link to="/user/home" className={location.pathname === "/user/home" ? "active" : ""}>
        <GoHome />
        <span>Beranda</span>
      </Link>
      <Link to="/user/doctor-info/:doctorId" className={location.pathname === "/doctors" ? "active" : ""}>
        <GoSearch />
        <span>Dokter</span>
      </Link>
      <Link to="/user/chat" className={location.pathname === "/user/chat" ? "active" : ""}>
        <GoCommentDiscussion />
        <span>Chat</span>
      </Link>
      <Link to="/user/referrals" className={location.pathname === "/user/referrals" ? "active" : ""}>
        <FaClipboardList />
        <span>Rujukan</span>
      </Link>
      <Link to="/user/login" onClick={handleLogout}>
        <GoSignOut />
        <span>Logout</span>
      </Link>
    </nav>
  );
}

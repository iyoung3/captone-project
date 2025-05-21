import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GoHome, GoCommentDiscussion, GoSignOut } from "react-icons/go";
import { MdRequestPage } from "react-icons/md";
import { logoutDoctor } from "../services/doctorAuthService";

export default function DoctorNavbar() {
  const location = useLocation();

  const handleLogout = () => {
    logoutDoctor();
  };

  return (
    <nav className="bottom-navbar">
      <Link to="/doctor/home" className={location.pathname === "/doctor/home" ? "active" : ""}>
        <GoHome />
        <span>Beranda</span>
      </Link>
      <Link to="/doctor/requests" className={location.pathname === "/doctor/requests" ? "active" : ""}>
        <MdRequestPage />
        <span>Permintaan</span>
      </Link>
      <Link to="/doctor/chat" className={location.pathname === "/doctor/chat" ? "active" : ""}>
        <GoCommentDiscussion />
        <span>Chat</span>
      </Link>
      <Link to="/doctor/login" onClick={handleLogout}>
        <GoSignOut />
        <span>Logout</span>
      </Link>
    </nav>
  );
}

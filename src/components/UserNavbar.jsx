import React from 'react';
import { Link } from 'react-router-dom';
import '../../src/styles/UserNavbar.css';
import {logoutUser} from "../services/userAuthService";

export default function UserNavbar() {
  const handleOnClick = () => {
    logoutUser()
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">CP Telemedicine</div>
      <ul className="navbar-links">
        <li><Link to="/user/home">Beranda</Link></li>
        <li><Link to="/doctors">Cari Dokter</Link></li>
        <li><Link to="/user/chat">Chat</Link></li>
        <li><Link to="/user/referrals">Rujukan Saya</Link></li>
        <li><Link to="/user/login" onClick={handleOnClick}>Logout</Link></li>
      </ul>
    </nav>
  );
}

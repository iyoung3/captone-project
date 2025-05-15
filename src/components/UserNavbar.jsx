import React from 'react';
import { Link } from 'react-router-dom';
import '../../src/styles/UserNavbar.css';

export default function UserNavbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">CP Telemedicine</div>
      <ul className="navbar-links">
        <li><Link to="/user/home">Beranda</Link></li>
        <li><Link to="/doctors">Cari Dokter</Link></li>
        <li><Link to="/chat/:id">Chat</Link></li>
        <li><Link to="">Rujukan Saya</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>
    </nav>
  );
}

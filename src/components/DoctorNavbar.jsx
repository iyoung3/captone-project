import React from 'react';
import { Link } from 'react-router-dom';
import '../../src/styles/DoctorNavbar.css';

export default function DoctorNavbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">CP Telemedicine</div>
      <ul className="navbar-links">
        <li><Link to="/doctor/home">Beranda</Link></li>
        <li><Link to="/doctor/requests">Permintaan Konsultasi</Link></li>
        <li><Link to="/doctor-chat/:id">Chat Pasien</Link></li>
        <li><Link to="/doctor/referrals">Buat Rujukan</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>
    </nav>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/DoctorHomePage.css";
import DoctorNavbar from "../../components/DoctorNavbar";
import {AuthDoctorWrapper} from "../../components/AuthDoctorWrapper";

export default function DoctorHomePage() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <AuthDoctorWrapper>
      <div>
          <DoctorNavbar />
        <div className="doctor-home-container">
          <h1 className="doctor-home-title">Selamat datang, Dokter!</h1>
          <ul className="doctor-home-list">
            <li
              className="doctor-home-item"
              onClick={() => handleNavigation("/doctor/requests")}
            >
              Lihat Permintaan Konsultasi
            </li>
            <li
              className="doctor-home-item"
              onClick={() => handleNavigation("/doctor/chat")}
            >
              Mulai Chat dengan Pasien
            </li>
            <li
              className="doctor-home-item"
              onClick={() => handleNavigation("/doctor/referrals")}
            >
              Buat Rujukan untuk Pasien
            </li>
          </ul>
        </div>
      </div>
    </AuthDoctorWrapper>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/DoctorHomePage.css";
import { FaList, FaComments, FaUserMd } from "react-icons/fa"; // Impor ikon dari react-icons
import { AuthDoctorWrapper } from "../../components/AuthDoctorWrapper";
import DoctorNavbar from "../../components/DoctorNavbar"; // Bisa dihapus jika tidak ingin navbar

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
              <FaList size={30} className="doctor-home-item-icon" />
              Lihat Permintaan Konsultasi
            </li>
            <li
              className="doctor-home-item"
              onClick={() => handleNavigation("/doctor/chat")}
            >
              <FaComments size={30} className="doctor-home-item-icon" />
              Mulai Chat dengan Pasien
            </li>
            <li
              className="doctor-home-item"
              onClick={() => handleNavigation("")}
            >
              <FaUserMd size={30} className="doctor-home-item-icon" />
              Buat Rujukan untuk Pasien
            </li>
          </ul>
        </div>
      </div>
    </AuthDoctorWrapper>
  );
}

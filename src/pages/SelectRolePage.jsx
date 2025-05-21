import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SelectRolePage.css";
import backgroundImage from "../assets/iconAppT.png";

export default function SelectRolePage() {
  const navigate = useNavigate();

  return (
    <div
      className="select-role-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="select-role-content">
        <h2>Masuk Sebagai</h2>
        <div className="select-role-buttons">
          <button
            onClick={() => navigate("/doctor/login")}
            className="select-role-button doctor"
          >
            Dokter
          </button>
          <button
            onClick={() => navigate("/user/login")}
            className="select-role-button pasien"
          >
            Pasien
          </button>
        </div>
      </div>
    </div>
  );
}

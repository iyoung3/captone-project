import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SelectRolePage.css";

export default function SelectRolePage() {
  const navigate = useNavigate();

  return (
    <div className="select-role-container">
      <h2>Masuk Sebagai</h2>
      <div className="select-role-buttons">
        <button onClick={() => navigate("/doctor/login")}>Dokter</button>
        <button onClick={() => navigate("/user/login")}>Pasien</button>
      </div>
    </div>
  );
}

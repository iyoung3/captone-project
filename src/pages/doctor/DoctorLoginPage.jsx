import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import "../../styles/DoctorLoginPage.css"

export default function DoctorLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password }, true);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/doctor/home");
    } catch (err) {
      alert("Login gagal. Periksa email dan password.");
    }
  };

  return (
    <div className="doctor-login-container">
  <h2>Login Dokter</h2>
  <form onSubmit={handleSubmit} className="doctor-login-form">
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <button type="submit" className="doctor-login-button">Login</button>
  </form>
</div>

  );
}

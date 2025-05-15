import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import "../../styles/UserRegisterPage.css";

export default function UserRegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: null,
    address: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Data yang dikirim:", form);

      await register(form, false);

      alert("Registrasi berhasil. Silakan login.");
      navigate("/user/login");
    } catch (err) {
      console.error("Error saat registrasi:", err);
      alert("Registrasi gagal. Cek kembali data Anda.");
    }
  };

  return (
    <div className="register-container">
      <h2>Registrasi User</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nama"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="Nomor Telepon"
          required
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Alamat"
        />
        <input
          name="dateOfBirth"
          type="date"
          value={form.dateOfBirth}
          onChange={handleChange}
          placeholder="Tanggal Lahir"
        />
        <button type="submit" className="register-button">
          Daftar
        </button>
      </form>
    </div>
  );
}

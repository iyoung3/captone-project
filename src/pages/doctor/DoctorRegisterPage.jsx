import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import { Link } from "react-router-dom";
import "../../styles/DoctorRegisterPage.css"

export default function DoctorRegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    hospitalAffiliation: "",
    specialization: "",
    licenseNumber: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Data yang dikirim:", form);
      await register(form, true);
      alert("Registrasi berhasil. Silakan login.");
      navigate("/doctor/login");
    } catch (err) {
      alert("Registrasi gagal. Cek kembali data Anda.");
      console.error(err);
    }
  };

  return (
    <div className="doctor-register-container">
      <h2>Registrasi Dokter</h2>
      <form onSubmit={handleSubmit} className="doctor-register-form">
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
          name="hospitalAffiliation"
          value={form.hospitalAffiliation}
          onChange={handleChange}
          placeholder="Rumah Sakit Afiliasi"
        />
        <input
          name="specialization"
          value={form.specialization}
          onChange={handleChange}
          placeholder="Spesialisasi"
        />
        <input
          name="licenseNumber"
          value={form.licenseNumber}
          onChange={handleChange}
          placeholder="Nomor STR/SIP"
          required
        />
        <button type="submit" className="doctor-register-button">
          Daftar
        </button>
        <p>
          Sudah punya akun?
          <Link to='/doctor/login'>Masuk</Link>
        </p>
      </form>
    </div>
  );
}

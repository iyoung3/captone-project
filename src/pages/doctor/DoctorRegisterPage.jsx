import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {registerDoctor} from "../../services/doctorAuthService";

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
      await registerDoctor(form);
      alert("Registrasi berhasil. Silakan login.");
      navigate("/doctor/login");
    } catch (err) {
      alert("Registrasi gagal. Cek kembali data Anda.");
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center px-16">
      <h2 className={'text-5xl text-left w-full mt-8 text-secondary px-6 font-bold'}>Daftar</h2>
      <p className={'text-left text-sm mb-16 w-full px-6 text-neutral-500'}>Sebagai dokter</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
        <input
            className={'input'}
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nama"
          required
        />
        <input
            className={'input'}
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
            className={'input'}
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
            className={'input'}
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="Nomor Telepon"
          required
        />
        <input
            className={'input'}
          name="hospitalAffiliation"
          value={form.hospitalAffiliation}
          onChange={handleChange}
          placeholder="Rumah Sakit Afiliasi"
        />
        <select
          name="specialization"
          value={form.specialization}
          onChange={handleChange}
          required
          className={'input bg-white'}
        >
          <option value="">Pilih Spesialisasi</option>
          <option value="DERMATOLOGY">DERMATOLOGY</option>
          <option value="CARDIOLOGY">CARDIOLOGY</option>
          <option value="NEUROLOGY">NEUROLOGY</option>
          <option value="PEDIATRICS">PEDIATRICS</option>
          <option value="PSYCHIATRY">PSYCHIATRY</option>
          <option value="ORTHOPEDICS">ORTHOPEDICS</option>
          <option value="GYNECOLOGY">GYNECOLOGY</option>
          <option value="OPHTHALMOLOGY">OPHTHALMOLOGY</option>
          <option value="RADIOLOGY">RADIOLOGY</option>
          <option value="ANESTHESIOLOGY">ANESTHESIOLOGY</option>
        </select>

        <input
            className={'input'}
          name="licenseNumber"
          value={form.licenseNumber}
          onChange={handleChange}
          placeholder="Nomor STR/SIP"
          required
        />
        <button type="submit" className="button bg-secondary text-white">
          Daftar
        </button>
        <p className={'text-center text-xs'}>
          Sudah punya akun?
          <Link className={'text-secondary'} to='/doctor/login'> Masuk</Link>
        </p>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/userAuthService";
import { Link } from "react-router-dom";

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

      await registerUser(form);

      alert("Registrasi berhasil. Silakan login.");
      navigate("/user/login");
    } catch (err) {
      console.error("Error saat registrasi:", err);
      alert("Registrasi gagal. Cek kembali data Anda.");
    }
  };

  return (

      <div className="container mx-auto min-h-screen flex flex-col items-center px-16">
        <h1 className={'text-5xl text-left w-full mt-8 text-primary px-6 font-bold'}>Daftar</h1>
        <p className={'text-left text-sm mb-16 w-full px-6 text-neutral-500'}>Sebagai pengguna</p>
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
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Alamat"
          />
          <input
              className={'input'}
              name="dateOfBirth"
              type="date"
              value={form.dateOfBirth}
              onChange={handleChange}
              placeholder="Tanggal Lahir"
          />
          <button type="submit" className="button bg-primary text-white">
            Daftar
          </button>
          <p className={'text-center text-xs'}>Sudah punya akun?
            <Link className={'text-primary'} to="/user/login"> Login</Link>
          </p>
        </form>
      </div>
  );
}

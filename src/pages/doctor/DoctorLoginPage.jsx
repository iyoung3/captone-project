import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {loginDoctor} from "../../services/doctorAuthService";

export default function DoctorLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginDoctor({ email, password });
      navigate("/doctor/home");
    } catch (err) {
      alert("Login gagal. Periksa email dan password.");
    }
  };

  return (
    <div className="container mx-auto min-h-[100dvh] flex flex-col items-center px-16">

      <img src={'/svg/login-doctor.svg'} alt={'login'} className={'w-2/3 mt-12 min-h-[340px]'}/>
      <h1 className={'text-5xl text-left w-full mt-8 text-secondary px-6'}><span
        className={'font-bold'}>Log</span> <span className={'font-extralight'}>in</span></h1>

      <p className={'text-left text-sm mb-16 w-full px-6 text-neutral-500'}>Sebagai dokter</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
        <input
          type="email"
          placeholder="Email"
          className="input w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="button bg-secondary w-full text-white">
          Login
        </button>
        <p className={'text-center text-xs'}>
          belum punya akun? <Link className={'text-secondary'} to="/doctor/register">Daftar</Link>
        </p>
      </form>

      <span className={'fixed bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-500'}>
          Made by Kelompok 4
        </span>
    </div>
  );
}

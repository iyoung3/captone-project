import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/userAuthService";
import { Link } from "react-router-dom";

export default function UserLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      navigate("/user/home");
    } catch (err) {
      alert("Login gagal. Periksa email dan password Anda.");
    }
  };

  return (
      <div className="container mx-auto min-h-screen flex flex-col items-center px-16">

        <h1 className={'text-5xl text-left w-full mt-8 mb-16 text-primary px-6'}><span className={'font-bold'}>Log</span> <span className={'font-extralight'}>in</span></h1>
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
          <button type="submit" className="button bg-primary w-full text-white">
            Login
          </button>
          <p className={'text-center text-xs'}>
            belum punya akun? <Link className={'text-primary'} to="/user/register">daftar</Link>
          </p>
        </form>

        <span className={'fixed bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-500'}>
          Made by Kelompok 4
        </span>
      </div>
  );
}

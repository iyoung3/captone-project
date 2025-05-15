import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import '../../styles/UserLoginPage.css'

export default function UserLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Data login yang dikirim:", { email, password });
      const data = await login({ email, password }, false);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log("Token disimpan:", data.token);
      navigate("/user/home");
    } catch (err) {
      console.error("Login gagal:", err);
      alert("Login gagal. Periksa email dan password Anda.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login Pengguna</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

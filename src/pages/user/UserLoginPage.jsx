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
        <p>
          belum punya akun?<Link to="/user/register">daftar</Link>
        </p>
      </form>
    </div>
  );
}

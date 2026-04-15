// pages/Login.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import { FiMail, FiLock } from "react-icons/fi";
import "../styles/main.css";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Login to your account</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <FiMail className="auth-input-icon" />
            <input
              type="email"
              required
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="auth-input-group">
            <FiLock className="auth-input-icon" />
            <input
              type="password"
              required
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}
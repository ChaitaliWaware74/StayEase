// pages/Register.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import { FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi";
import "../styles/main.css";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/auth/register", form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join StayEase today</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <FiUser className="auth-input-icon" />
            <input
              type="text"
              required
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

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

          <div className="auth-input-group">
            <FiPhone className="auth-input-icon" />
            <input
              type="tel"
              required
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}
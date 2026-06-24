import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      setMessage("");
      return;
    }

    try {
      await axios.post("http://localhost:5500/api/users/UserRegister", formData);

      setMessage("Registration successful!");
      setError("");

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      setTimeout(() => navigate("/Userlogin"), 1200);
    } catch (err) {
      setError("Registration failed");
      setMessage("");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "#f4f6fb",
      }}
    >
      <div
        className="bg-white shadow"
        style={{
          width: "420px",
          borderRadius: "25px",
          padding: "40px 35px",
        }}
      >
        {/* Heading */}
        <div className="text-center mb-4">
          <h1
            style={{
              fontWeight: "700",
              color: "#0b1b3f",
            }}
          >
            Create Account
          </h1>

          <p
            style={{
              color: "#6c757d",
              marginTop: "10px",
            }}
          >
            Sign up to get started
          </p>
        </div>

        {/* Success/Error Messages */}
        {message && (
          <div className="alert alert-success py-2">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger py-2">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              style={{
                height: "48px",
                borderRadius: "12px",
                border: "1px solid #dcdcdc",
              }}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Email address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              style={{
                height: "48px",
                borderRadius: "12px",
                border: "1px solid #dcdcdc",
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              style={{
                height: "48px",
                borderRadius: "12px",
                border: "1px solid #dcdcdc",
              }}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="btn w-100"
            style={{
              background: "#0891c9",
              color: "white",
              height: "48px",
              borderRadius: "30px",
              fontWeight: "600",
              border: "none",
              fontSize: "18px",
            }}
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4">
          <span style={{ color: "#555" }}>
            Already have an account?{" "}
          </span>

          <span
            onClick={() => navigate("/UserLogin")}
            style={{
              color: "#000",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { fetchCartData } from "../Slice/CartSlice";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://luxecore-api.onrender.com/api/users/UserLogin",
        loginData,
      );
      console.log("respose", response.data.token);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      dispatch(fetchCartData());
      setError("");

      if (response.data.user.role === "admin") {
        navigate("/AdminDashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Invalid email or password");
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
          width: "380px",
          borderRadius: "25px",
          padding: "40px 30px",
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
            Welcome Back
          </h1>

          <p
            style={{
              color: "#6c757d",
              marginTop: "10px",
            }}
          >
            Login to your account
          </p>
        </div>

        {/* Alerts */}
        {message && <div className="alert alert-success py-2">{message}</div>}

        {error && <div className="alert alert-danger py-2">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="form-control"
              value={loginData.email}
              onChange={handleChange}
              style={{
                height: "48px",
                borderRadius: "12px",
                border: "1px solid #dcdcdc",
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="form-control"
              value={loginData.password}
              onChange={handleChange}
              style={{
                height: "48px",
                borderRadius: "12px",
                border: "1px solid #dcdcdc",
              }}
            />
          </div>

          {/* Forgot */}
          {/* <div className=" text-center mb-4">
            <span
              style={{
                color: "#0b1b3f",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Forgot password?
            </span>
          </div> */}

          {/* Button */}
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
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4">
          <span style={{ color: "#555" }}>Don’t have an account? </span>

          <span
            onClick={() => navigate("/UserRegister")}
            style={{
              color: "#000",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

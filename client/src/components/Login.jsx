import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css"; // Reuse CSS

import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import queenB from "../Assets/queenB.jpg";

const InputField = ({ type, name, placeholder, value, onChange, icon }) => (
  <div className="input">
    {icon && <img src={icon} alt="" />}
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const Login = ({ userRoleChanged }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleLogin = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Email and password are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);

        // localStorage.setItem("role", data.user.role);
        // setUserMail(formData.email);
        userRoleChanged(data.user.role);

        navigate("/home");
      } else {
        alert(data.error);
        console.log("Login failed:", data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    console.log(formData);
  };

  return (
    <div className="split-container">
      {/* Left side for welcome-section */}
      <div className="welcome-section">
        <img src={queenB} alt="Company Logo" className="logo" />
        <h1>מתפתחות</h1>
        <p>Join us and explore opportunities as a mentor or mentee.</p>
      </div>
      <div className="login-section">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <InputField
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            icon={email_icon}
          />
          <InputField
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            icon={password_icon}
          />
        </div>
        <div className="submit-container">
          <button className="submit" onClick={handleLogin}>
            Login
          </button>
          <div className="submit gray" onClick={() => navigate("/signup")}>
            Sign Up
          </div>
        </div>
        <div className="forgot-password">
          <a href="#" onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

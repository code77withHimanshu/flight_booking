import React, { useState } from "react";
import axios from "axios";
import "./RegisterForm.css";
import plane from "./plane.jpg";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    axios
      .post("http://localhost:5000/api/register", formData)
      .then((response) => {
        alert(response.data.message);
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
          });
      })
      .catch((error) => {
        console.error(error);
        alert("Registration failed!");
      });
  };

  return (
    <div className="register-container">
      <div className="left-panel">
        <img src={plane} alt="Plane" className="background-image" />
      </div>
      <div className="right-panel">
        <Link to="/signin">
          <button className="sign-in">Sign In</button>
        </Link>
        <h2>Explore & Experience</h2>
        <p>Get onto your most comfortable journey yet. All the way up.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" className="get-started-btn">
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

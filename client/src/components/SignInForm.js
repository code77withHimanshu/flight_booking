import React, { useState } from "react";
import axios from "axios";
import "./SignInForm.css"; 
import plane from "./plane.jpg";
import { Link } from "react-router-dom";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make the API call to log the user in
    axios
      .post("http://localhost:5000/api/login", formData) // Make sure your login API is correct
      .then((response) => {
        alert(response.data.message); // Handle successful login
      })
      .catch((error) => {
        console.error(error);
        alert("Login failed!");
      });
  };

  return (
    <div className="register-container">
      <div className="left-panel">
        <img src={plane} alt="Plane" className="background-image" />
      </div>
      <div className="right-panel">
        <Link to="/">
          <button className="sign-in">Register</button>
        </Link>
        <h2>Explore & Experience</h2>
        <p>Get onto your most comfortable journey yet. All the way up.</p>
        <form onSubmit={handleSubmit}>
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
            <button type="submit" className="get-started-btn">
            Sign In
            </button>
        </form>
      </div>
    </div>
  );

  
};

export default SignInForm;

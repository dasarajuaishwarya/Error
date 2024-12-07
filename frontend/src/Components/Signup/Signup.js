import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import API_BASE_URL from "../../config";

const Signup = () => {
  const [name, setName] = useState(""); // Added state for name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/signup`, {
        name, // Include name in the signup request
        email,
        password,
      });

      navigate("/login"); // Redirect to the login page upon successful signup
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to the login page when "Already have an account" is clicked
  };

  return (
    <PageContainer>
      <NavBar>
        <div className="nav-title">Expense Tracker</div>
        <button className="nav-button" onClick={() => navigate("/")}>
          Home
        </button>
      </NavBar>
      <FormContainer>
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Signup</button>
        </form>
        <div className="login-link">
          <p>Already have an account?</p>
          <button onClick={handleLoginRedirect}>Login</button>
        </div>
      </FormContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: rgba(252, 246, 249, 0.78);
`;

const NavBar = styled.nav`
  width: 100%;
  padding: 1rem 2rem;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);

  .nav-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: rgba(34, 34, 96, 1);
  }

  .nav-button {
    background: #222260;
    color: #ffffff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background: rgba(34, 34, 96, 0.8);
    }
  }
`;

const FormContainer = styled.div`
  margin-top: 5rem;
  width: 400px;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 1rem;
    color: rgba(34, 34, 96, 1);
  }

  form {
    display: flex;
    flex-direction: column;

    input {
      margin-bottom: 1rem;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 8px;
    }

    button {
      padding: 0.75rem;
      background: #222260;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;

      &:hover {
        background: rgba(34, 34, 96, 0.8);
      }
    }
  }

  .login-link {
    margin-top: 1rem;
    text-align: center;

    p {
      margin-bottom: 0.5rem;
      color: rgba(34, 34, 96, 0.6);
    }

    button {
      background: none;
      border: none;
      color: #222260;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .error {
    color: red;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    text-align: center;
  }
`;

export default Signup;

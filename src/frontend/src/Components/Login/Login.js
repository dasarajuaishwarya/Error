import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import API_BASE_URL from "../../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });

      const { token, name } = response.data;

      if (token && name) {
        // Save the token and user's name in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
  
        // Redirect to the dashboard
        navigate("/dashboard");
      } else {
        setError("Invalid response from the server.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  const handleSignupRedirect = () => {
    // Redirect to the signup page
    navigate("/signup");
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
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <div className="signup-link">
          <p>Don't have an account?</p>
          <button onClick={handleSignupRedirect}>Signup</button>
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

  .signup-link {
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

export default Login;

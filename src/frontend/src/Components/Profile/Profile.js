import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import API_BASE_URL from "../../config";  // Assuming this is the correct base URL for your API
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    console.log("Update Profile button clicked!"); // Log button click
    
    const token = localStorage.getItem("token");
    console.log("Token in frontend:", token); // Debug token presence
    
    if (!name.trim()) {
      setMessage("Name is required.");
      console.log("Validation failed: Name is required");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      console.log("Validation failed: Passwords do not match");
      return;
    }
  
    try {
      const response = await axios.put(
        `${API_BASE_URL}/profile`,  // Correct URL for the backend route
        { name, password: password || undefined },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Profile update response:", response.data);

      if (password) {
        setShowPopup(true);
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("name");
          navigate("/login");
        }, 3000);
        return;
      }

      localStorage.setItem("name", name);
      setMessage(response.data.message || "Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Profile update error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "An error occurred while updating your profile.");
    }
  };

  return (
    <ProfileStyled>
      <h1>Profile</h1>
      {message && <p className="message">{message}</p>}
      {editMode ? (
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your new name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">New Password (optional):</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password (optional):</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
            />
          </div>
          <div className="buttons">
            <button type="submit">Update Profile</button>
            <button type="button" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-info">
          <p><strong>Name:</strong> {name}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}

      {showPopup && (
        <div className="popup">
          <p>Password updated successfully! Logging out...</p>
        </div>
      )}
    </ProfileStyled>
  );
};

const ProfileStyled = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h1 {
    text-align: center;
    margin-bottom: 1rem;
    color: #333;
  }

  .message {
    text-align: center;
    color: red;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .form-group {
      display: flex;
      flex-direction: column;

      label {
        margin-bottom: 0.5rem;
        font-weight: bold;
        color: #555;
      }

      input {
        padding: 0.8rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1rem;
      }
    }

    .buttons {
      display: flex;
      justify-content: space-between;

      button {
        flex: 1;
        padding: 0.8rem;
        background-color: #222260;
        color: #fff;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
        margin: 0 0.5rem;

        &:hover {
          background-color: #1a1a50;
        }
      }
    }
  }

  .profile-info {
    text-align: center;

    p {
      margin: 1rem 0;
      font-size: 1.2rem;
    }

    button {
      padding: 0.8rem;
      background-color: #222260;
      color: #fff;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #1a1a50;
      }
    }
  }

  .popup {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #222260;
    color: #fff;
    padding: 1rem 2rem;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    z-index: 1000;

    p {
      margin: 0;
      font-size: 1.2rem;
    }
  }
`;

export default Profile;

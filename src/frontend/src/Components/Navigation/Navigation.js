import React from "react";
import styled from "styled-components";
import avatar from "../../img/avatar.png"; // Ensure this path is correct
import { signout } from "../../utils/Icons"; // Ensure this path is correct
import { menuItems } from "../../utils/menuItems"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";

const Navigation = ({ active, setActive }) => {
  const navigate = useNavigate();

  // Retrieve the user's name from localStorage (set after login)
  const username = localStorage.getItem("name") || "User"; // Default to "User" if name is not available

  const handleSignOut = () => {
    // Clear the token and name from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login"); // Redirect to the login page
  };

  const navigateToProfile = () => {
    navigate("/profile"); // Navigate to the Profile Page
  };

  return (
    <NavStyled>
      <div className="user-con">
        <img src={avatar} alt="User Avatar" />
        <div className="text">
          <h2>{username}</h2>
          <p>Welcome Back!</p>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              setActive(item.id); // Set active tab
              navigate(item.link); // Navigate to the correct route using `link`
            }}
            className={active === item.id ? "active" : ""}
          >
            {item.icon}
            <span>{item.title}</span>
          </li>
        ))}
      </ul>

      <div className="bottom-nav">
        <li onClick={navigateToProfile}>
          <i className="fas fa-user-circle" style={{ marginRight: "0.5rem" }}></i>
          Profile
        </li>
        <li onClick={handleSignOut}>
          {signout} Sign Out
        </li>
      </div>
    </NavStyled>
  );
};

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }

    h2 {
      color: rgba(34, 34, 96, 1);
    }

    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;

    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;

      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;

    i {
      color: rgba(34, 34, 96, 1) !important;
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }

  .bottom-nav {
    li {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease-in-out;
      color: rgba(34, 34, 96, 0.8);

      &:hover {
        color: rgba(34, 34, 96, 1);
      }

      i {
        margin-right: 0.5rem;
      }
    }
  }
`;

export default Navigation;

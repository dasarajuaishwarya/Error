import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <WelcomeText>Welcome to the Expense Tracker</WelcomeText>
      <FormContainer>
        <div className="button-container">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Signup</button>
        </div>
      </FormContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: rgba(252, 246, 249, 0.78);
`;

const WelcomeText = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: rgba(34, 34, 96, 1);
  font-size: 2rem;
`;

const FormContainer = styled.div`
  width: 400px;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);

  .button-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;

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
`;

export default Home;

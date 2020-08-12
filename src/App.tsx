import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { AppRoutes } from "./AppRoutes";
import { useEffect, useState } from "react";

export const App: React.FC = () => {
  const [token, setToken] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData") || "{}");

    if (storedData && storedData.token) {
      setToken(storedData.token);
    }
  }, []);

  return (
    <AppWrapper>
      <GlobalStyle />
      <AppRoutes token={token} setToken={setToken} />
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
`;

const GlobalStyle = createGlobalStyle`
    html {
      font-size: 62.5%;
      font-family: Verdana, Geneva, sans-serif;
      background-color: #ccc;
    }
    
    body {
      margin: 0;
    }
`;

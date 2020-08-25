import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { AppRoutes } from "./AppRoutes";
import { useEffect, useState } from "react";
import { GLOBAL_API } from "./common/constants";

export const App: React.FC = () => {
  const [token, setToken] = useState("");

  // this app has no logout, so jwt will persist in browser. If valid token, add to state.
  // If expired then remove it from localstorage
  useEffect(() => {
    const verifyToken = async (token: string) => {
      const url = `${GLOBAL_API}users/verifyToken`;

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      });

      if (response.status === 204) {
        setToken(storedData.token);
      } else {
        localStorage.removeItem("userData");
      }
    };

    const storedData = JSON.parse(localStorage.getItem("userData") || "{}");

    if (storedData && storedData.token) {
      verifyToken(storedData.token);
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
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-size: 18px;
`;

const GlobalStyle = createGlobalStyle`
    html {
      font-size: 62.5%; // 1 rem = 10 px
      font-family: Verdana, Geneva, sans-serif;
      background-color: #ccc;
    }
    
    body {
      margin: 0;
    }
`;

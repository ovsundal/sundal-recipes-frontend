import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { AppRoutes } from "./AppRoutes";

export const App: React.FC = () => {
  return (
    <AppWrapper>
      <GlobalStyle />
      <AppRoutes />
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

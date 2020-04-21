import * as React from "react";
import styled from "styled-components";
import { AppRoutes } from "./AppRoutes";

export const App: React.FC = () => {
  return (
    <AppWrapper>
      <AppRoutes />
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;

  font-family: Verdana, Geneva, sans-serif;
  font-size: 18px;
  background-color: #ccc;
`;

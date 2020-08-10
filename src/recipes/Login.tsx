import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: create backend endpoint and do auth
    console.log("clicked form submit");
  };

  return (
    <LoginWrapper onSubmit={submitForm}>
      Login screen. User is logged in: {isLoggedIn ? "true" : "false"}
      <label>
        Username
        <input />
      </label>
      <label>
        Password
        <input />
      </label>
      <button type={"submit"}>Login</button>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.form`
  display: flex;
  flex-direction: column;

  margin-top: 5rem;
`;

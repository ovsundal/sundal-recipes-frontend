import React, { useState } from "react";
import styled from "styled-components";
import { GLOBAL_API } from "../common/constants";
import { useHistory } from "react-router-dom";

interface ILogin {
  token: {};
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const Login: React.FC<ILogin> = ({ token, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { goBack }: any = useHistory();

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      username,
      password
    };

    const url = `${GLOBAL_API}users/login`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        }
      });

      // return user if login success
      if (response) {
        const { token, username } = await response.json();

        if (token) {
          setToken(token);
          localStorage.setItem("userData", JSON.stringify({ token }));
          goBack();
        }
      }
    } catch (e) {
      console.log("could not login ", e.toString());
    }
  };

  return (
    <LoginWrapper onSubmit={submitForm}>
      <h2>Login</h2>
      <label>
        Username
        <input
          type={"text"}
          value={username}
          onChange={v => setUsername(v.target.value)}
        />
      </label>
      <label>
        Password
        <input
          type={"password"}
          value={password}
          onChange={v => setPassword(v.target.value)}
        />
      </label>
      <button type={"submit"}>Login</button>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 5rem;
  font-size: 3rem;
  font-family: monospace;

  label {
    align-self: center;
  }

  input {
    font-size: 2.5rem;
    margin: 0 0 1rem 0;
  }

  button {
    width: 80%;
    background-color: #0069d9;
    font-size: 3rem;
    margin-top: 3rem;
  }
`;

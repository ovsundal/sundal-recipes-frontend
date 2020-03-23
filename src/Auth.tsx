import * as React from "react";
import { useReducer, useState } from "react";
import styled from "styled-components";

interface IAuthProps {}

const authReducer = (state: any, action: any) => {

  switch (action.type) {
    case "INPUT_CHANGE": {
      return state;
    }
    case "UPDATE_USERNAME": {
      return state
    }
    default:
      return state;
  }
};

export const Auth: React.FC<IAuthProps> = ({}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        { method: "POST" }
      );
// TODO: hook-up to login
      const a = await response.json();
    } catch (e) {}
  };

  const updateValue = (e: any) => {
    const {id, value} = e.target;

    if(id === 'username') {
      setUsername(value);
    }
    else {
      setPassword(value)
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const payload = {username, password};

// TODO: payload hentes som undefined values i backend???
    const response = await fetch('http://localhost:5000/api/users/signup', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  };

  return (
    <AuthWrapper>
      <p>Login status: {isLoggedIn ? "Logged in" : "Not logged in"}</p>
      <LoginFormWrapper onSubmit={handleLogin}>
        <label>
          username
          <input type={'text'} value={username} onChange={updateValue} id={'username'} />
        </label>
        <label>
          password
          <input type={'password'} value={password} onChange={updateValue}  id={'password'} />
        </label>
        <button>Login</button>
      </LoginFormWrapper>
    </AuthWrapper>
  );
};

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

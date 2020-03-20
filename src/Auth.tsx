import * as React from "react";
import { useReducer, useState } from "react";
import styled from "styled-components";

interface IAuthProps {}

// const authReducer = (state: any, action: any) => {
//   switch (action.type) {
//     case "INPUT_CHANGE": {
//       console.log(state);
//       return state;
//     }
//     default:
//       return state;
//   }
// };

export const Auth: React.FC<IAuthProps> = ({}) => {
  // const [authState, dispatch] = useReducer(authReducer, {
  //   username: "",
  //   password: ""
  // });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async () => {
    try {
      const response = await fetch(
        "https://sundal-recipes.herokuapp.com/api/users/login",
        { method: "POST" }
      );

      const a = await response.json();
      console.log(response);
      console.log(a);
    } catch (e) {}
  };

  return (
    <AuthWrapper>
      <p>Login status: {isLoggedIn ? "Logged in" : "Not logged in"}</p>
      <LoginFormWrapper>
        <label>
          username
          <input />
        </label>
        <label>
          password
          <input />
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

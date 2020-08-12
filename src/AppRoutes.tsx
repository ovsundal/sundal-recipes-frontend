import * as React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { AddUpdateRecipe } from "./recipes/AddUpdateRecipe";
import { RecipeList } from "./recipes/RecipeList";
import { RecipeItem } from "./recipes/RecipeItem";
import { Login } from "./recipes/Login";

interface IAppRoutes {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const AppRoutes: React.FC<IAppRoutes> = ({ token, setToken }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact={true}
          path={"/"}
          children={<RecipeList token={token} />}
        />
        <Route
          exact={true}
          path={"/recipes/:recipeId"}
          children={<RecipeItem token={token} />}
        />
        <Route
          exact={true}
          path={"/add-recipe"}
          children={<AddUpdateRecipe token={token} />}
        />
        <Route
          exact={true}
          path={"/update-recipe"}
          children={<AddUpdateRecipe token={token} />}
        />
        <Route
          exact={true}
          path={"/login"}
          children={<Login token={token} setToken={setToken} />}
        />
      </Switch>
    </BrowserRouter>
  );
};

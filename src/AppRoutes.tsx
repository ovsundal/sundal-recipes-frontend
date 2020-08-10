import * as React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { AddUpdateRecipe } from "./recipes/AddUpdateRecipe";
import { RecipeList } from "./recipes/RecipeList";
import { RecipeItem } from "./recipes/RecipeItem";
import { Login } from "./recipes/Login";

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path={"/"} children={<RecipeList />} />
        <Route
          exact={true}
          path={"/recipes/:recipeId"}
          children={<RecipeItem />}
        />
        <Route
          exact={true}
          path={"/add-recipe"}
          children={<AddUpdateRecipe />}
        />
        <Route
          exact={true}
          path={"/update-recipe"}
          children={<AddUpdateRecipe />}
        />
        <Route exact={true} path={"/login"} children={<Login />} />
      </Switch>
    </BrowserRouter>
  );
};

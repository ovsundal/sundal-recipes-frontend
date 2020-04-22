import * as React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { AddRecipe } from "./recipes/AddRecipe";
import { RecipeList } from "./recipes/RecipeList";
import { RecipeItem } from "./recipes/RecipeItem";
import { UpdateRecipe } from "./recipes/UpdateRecipe";

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
        <Route exact={true} path={"/add-recipe"} children={<AddRecipe />} />
        <Route
          exact={true}
          path={"/update-recipe"}
          children={<UpdateRecipe />}
        />
      </Switch>
    </BrowserRouter>
  );
};

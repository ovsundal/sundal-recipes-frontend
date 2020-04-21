import * as React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { AddRecipe } from "./recipes/AddRecipe";
import { RecipeList } from "./recipes/RecipeList";
import { RecipeItem } from "./recipes/RecipeItem";

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path={"/"} children={<RecipeList />} />
        <Route exact={true} path={"/:recipeName"} children={<RecipeItem />} />
        <Route path={"/add-recipe"} children={<AddRecipe />} />
      </Switch>
    </BrowserRouter>
  );
};

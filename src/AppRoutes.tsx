import * as React from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import {AddRecipe} from "./recipes/AddRecipe";
import {RecipeList} from "./recipes/RecipeList";


export const AppRoutes: React.FC = () => {



    return(
        <BrowserRouter>
        <Switch>
            <Route exact={true} path={"/"}>
                <RecipeList />
            </Route>
            <Route path={"/add-recipe"}>
                <AddRecipe />
            </Route>
        </Switch>
        </BrowserRouter>
    )
}

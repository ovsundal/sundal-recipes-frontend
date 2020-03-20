import * as React from 'react'
import styled from "styled-components";
import {useEffect, useState} from "react";
import {IRecipe, recipeItem} from "./RecipeItem";
import {Auth} from "./Auth";

export const App: React.FC = () => {

    const [recipeData, setRecipeData] = useState([] as IRecipe[]);

    useEffect(() => {
        const fetchRecipes = async() => {
          try {
              const response = await fetch('https://sundal-recipes.herokuapp.com/api/recipes/getRecipes');

              const {recipes}: {recipes: IRecipe[]} = await response.json();

              setRecipeData(recipes);
          } catch (e) {
              console.log('Error, could not get recipes', e);
          }

        };

        fetchRecipes();
    }, []);


    return(
        <AppWrapper>
            List of recipes:
            {recipeData.map(recipeItem)}

            <Auth />
        </AppWrapper>
    )
};

const AppWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

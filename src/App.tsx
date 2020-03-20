import * as React from 'react'
import styled from "styled-components";
import {useEffect, useState} from "react";

interface IRecipe {
    ingredients: string[],
    title: string,
    instructions: string,
    id: string
}

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
            {recipeData.map(recipeItem)}
        </AppWrapper>
    )
};

const recipeItem = (recipe: IRecipe) => {
    const {id, title, ingredients, instructions} = recipe;
    return (
        <div key={id}>
            <h1>{title}</h1>
            <p>{ingredients}</p>
            <p>{instructions}</p>
        </div>
    )
};

const AppWrapper = styled.div`
  display: flex;
`;

import * as React from 'react'
import styled from "styled-components";
import {useEffect, useState} from "react";
import {IRecipe, recipeItem} from "./RecipeItem";

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
            <FloatingAddRecipeButton href={'#'} title={'Add Recipe'}>
                <PlusIcon className="fa fa-plus my-float" />
            </FloatingAddRecipeButton>
        </AppWrapper>
    )
};

const AppWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  
  font-family:Verdana, Geneva, sans-serif;
  font-size:18px;
  background-color:#CCC;
`;

const FloatingAddRecipeButton = styled.a`
    position:fixed;
    width:60px;
    height:60px;
    bottom:40px;
    right:40px;
    background-color:#0C9;
    color:#FFF;
    border-radius:50px;
    text-align:center;
    box-shadow: 2px 2px 3px #999;
`;

const PlusIcon = styled.i`
  margin-top:22px;
`;

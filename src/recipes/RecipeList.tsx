import * as React from 'react'
import {IRecipe, recipeItem} from "./RecipeItem";
import styled from "styled-components";
import {BrowserRouter, Link} from "react-router-dom";
import {useState} from "react";
import {useEffect} from "react";

interface IRecipeListProps {
}

export const RecipeList: React.FC<IRecipeListProps> = ({}) => {

    const [recipeData, setRecipeData] = useState([] as IRecipe[]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(
                    "https://sundal-recipes.herokuapp.com/api/recipes/getRecipes"
                );

                const { recipes }: { recipes: IRecipe[] } = await response.json();

                setRecipeData(recipes);
            } catch (e) {
                console.log("Error, could not get recipes", e);
            }
        };

        fetchRecipes();
    }, []);

    return(
        <RecipeListWrapper>
            {recipeData.map(recipeItem)}

            <Link to={"/add-recipe"}>
                <FloatingAddRecipeButton title={"Add Recipe"}>
                    <PlusIcon className="fa fa-plus my-float" />
                </FloatingAddRecipeButton>
            </Link>
        </RecipeListWrapper>
    )
};

const RecipeListWrapper = styled.div`

`;

const FloatingAddRecipeButton = styled.a`
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #0c9;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
`;

const PlusIcon = styled.i`
  margin-top: 22px;
`;

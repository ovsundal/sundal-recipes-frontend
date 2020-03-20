import * as React from "react";
import styled from "styled-components";

export interface IRecipe {
    ingredients: string[],
    title: string,
    instructions: string,
    id: string
}

export const recipeItem = (recipe: IRecipe) => {
    const {id, title, ingredients, instructions} = recipe;
    return (
        <RecipeWrapper key={id}>
            <h1>{title}</h1>
            <p>{ingredients}</p>
            <p>{instructions}</p>
            </RecipeWrapper>
    )
};

const RecipeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

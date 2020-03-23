import * as React from 'react'
import {IRecipe, recipeItem} from "./RecipeItem";
import styled from "styled-components";

interface IRecipeListProps {
    data: IRecipe[]
}

export const RecipeList: React.FC<IRecipeListProps> = ({data}) => {



    return(
        <RecipeListWrapper>
            {data.map(recipeItem)}
        </RecipeListWrapper>
    )
};

const RecipeListWrapper = styled.div`

`;

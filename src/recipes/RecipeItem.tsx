import * as React from "react";
import styled from "styled-components";
import sanitize from "sanitize-html";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FloatingAddRecipeButton, PlusIcon } from "./RecipeList";

export interface IRecipe {
  id: string;
  recipe: string;
  title: string;
}

export const RecipeItem = () => {
  const [recipe, setRecipe] = useState({} as IRecipe);
  const { recipeId } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://sundal-recipes.herokuapp.com/api/recipes/getRecipe?id=${recipeId}`
          // `http://localhost:5000/api/recipes/getRecipe?id=${recipeId}`
        );
        const { recipes }: { recipes: IRecipe[] } = await response.json();

        setRecipe(recipes[0]);
      } catch (e) {
        console.log("Error, could not get recipes", e);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const { recipe: content, id, title } = recipe;
  const sanitizedContent = sanitize(content);

  return (
    <AddRecipeWrapper key={id}>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />

      <Link
        to={{
          pathname: `/update-recipe/`,
          state: { recipe }
        }}
      >
        <FloatingAddRecipeButton title={"Update Recipe"}>
          <EditIcon className="fa fa-edit" />
        </FloatingAddRecipeButton>
      </Link>
    </AddRecipeWrapper>
  );
};

export const AddRecipeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FloatingUpdateRecipeButton = styled(FloatingAddRecipeButton)``;

const EditIcon = styled(PlusIcon)``;

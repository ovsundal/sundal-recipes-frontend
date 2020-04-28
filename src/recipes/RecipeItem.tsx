import * as React from "react";
import styled from "styled-components";
import sanitize from "sanitize-html";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FloatingAddRecipeButton, PlusIcon } from "./RecipeList";
import { Spinner } from "../common/Spinner";

export interface IRecipe {
  id: string;
  recipe: string;
  title: string;
}

export const RecipeItem = () => {
  const [recipe, setRecipe] = useState({} as IRecipe);
  const [isLoading, setIsLoading] = useState(false);
  const { recipeId } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://sundal-recipes.herokuapp.com/api/recipes/getRecipe?id=${recipeId}`
          // `http://localhost:5000/api/recipes/getRecipe?id=${recipeId}`
        );
        const { recipes }: { recipes: IRecipe[] } = await response.json();

        setRecipe(recipes[0]);
      } catch (e) {
        console.log("Error, could not get recipes", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const { recipe: content, id, title } = recipe;
  const sanitizedContent = sanitize(content);

  return (
    <AddRecipeWrapper key={id}>
      {isLoading && <Spinner />}
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

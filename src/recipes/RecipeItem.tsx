import * as React from "react";
import styled from "styled-components";
import sanitize from "sanitize-html";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
    <RecipeWrapper key={id}>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </RecipeWrapper>
  );
};

const RecipeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

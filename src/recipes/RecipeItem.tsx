import * as React from "react";
import styled from "styled-components";
import sanitize from "sanitize-html";

export interface IRecipe {
  ingredients: string[];
  title: string;
  instructions: string;
  id: string;
}

export const recipeItem = (recipe: any) => {
  const { recipe: content, id } = recipe;
  const sanitizedContent = sanitize(content);

  return (
    <RecipeWrapper key={id}>
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </RecipeWrapper>
  );
};

const RecipeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

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

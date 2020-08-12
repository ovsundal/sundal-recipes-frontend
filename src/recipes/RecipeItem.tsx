import * as React from "react";
import styled from "styled-components";
import sanitize from "sanitize-html";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FloatingAddRecipeButton, PlusIcon } from "./RecipeList";
import { Spinner } from "../common/Spinner";
import { ITags } from "./AddUpdateRecipe";
import { GLOBAL_API } from "../common/constants";

export interface IRecipe {
  id: string;
  recipe: string;
  title: string;
  tags: ITags[];
}

interface IRecipeItem {
  token: string;
}

export const RecipeItem: React.FC<IRecipeItem> = ({ token }) => {
  const [recipe, setRecipe] = useState({} as IRecipe);
  const [isLoading, setIsLoading] = useState(false);
  const { recipeId } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${GLOBAL_API}recipes/getRecipe?id=${recipeId}`
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

  if (isLoading) {
    return <Spinner />;
  }

  const fabRedirect = token ? "/update-recipe" : "/login";

  return (
    <AddRecipeWrapper key={id}>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />

      <Link
        to={{
          pathname: fabRedirect,
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

const EditIcon = styled(PlusIcon)``;

import * as React from "react";
import { useEffect, useState } from "react";
import { IRecipe, RecipeItem } from "./RecipeItem";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Spinner } from "../common/Spinner";
import { GLOBAL_API } from "../common/constants";
import { SearchField } from "./SearchField";

interface IRecipeListProps {}

export const RecipeList: React.FC<IRecipeListProps> = ({}) => {
  const [recipeData, setAllRecipeData] = useState([] as IRecipe[]);
  const [shownRecipes, setShownRecipes] = useState([] as IRecipe[]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${GLOBAL_API}recipes/getRecipes`);

        const { recipes }: { recipes: IRecipe[] } = await response.json();

        setAllRecipeData(recipes);
        setShownRecipes(recipes);
      } catch (e) {
        console.log("Error, could not get recipes", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  const updateShownRecipes = (updatedRecipes: IRecipe[]) =>
    setShownRecipes(updatedRecipes);

  return (
    <RecipeListWrapper>
      <SearchField recipeData={recipeData} updateRecipes={updateShownRecipes} />
      {shownRecipes.map(({ title, id, tags }) => (
        <Link to={"recipes/" + id} key={id}>
          <ListItem>
            <li>{title}</li>
            <TagContainer>
              {tags && tags.map(({ id, name }) => <span key={id}>{name}</span>)}
            </TagContainer>
          </ListItem>
        </Link>
      ))}

      <Link to={"/add-recipe"}>
        <FloatingAddRecipeButton title={"Add Recipe"}>
          <PlusIcon className="fa fa-plus my-float" />
        </FloatingAddRecipeButton>
      </Link>
    </RecipeListWrapper>
  );
};

const RecipeListWrapper = styled.ul`
  list-style: none;
  padding-left: 0;
  li {
    padding: 0.5rem 0 0.5rem 1rem;
  }

  a {
    color: black;
    text-decoration: none;
    font-size: 2.5rem;
  }

  @media only screen and (max-width: 600px) {
    width: inherit;
  }
`;

export const FloatingAddRecipeButton = styled.p`
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #0c9;

  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
`;

export const PlusIcon = styled.i`
  margin-top: 1.6rem;
  color: #fff;
  font-size: 3rem;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;

  border-bottom: 1px solid black;
`;

const TagContainer = styled.div`
  span {
    margin: 0 0.3rem;

    opacity: 0.7;
    background-color: white;
    font-style: italic;
    font-size: 1.3rem;
    border-radius: 2rem;
  }

  span:first-child {
    margin: 0;
  }
`;

import * as React from "react";
import { useEffect, useState } from "react";
import { IRecipe, RecipeItem } from "./RecipeItem";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface IRecipeListProps {}

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

  return (
    <RecipeListWrapper>
      {recipeData.map(({ title, id }) => (
        <Link to={"recipes/" + id} key={id}>
          <li>{title}</li>
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

  li {
    border-bottom: 1px solid black;
    padding: 1.5rem;
  }

  a {
    color: black;
    text-decoration: none;
    font-size: 1.2rem;
  }
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

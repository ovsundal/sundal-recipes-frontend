import * as React from "react";
import styled from "styled-components";
import { IRecipe } from "./RecipeItem";
import { useEffect, useState } from "react";

interface ISearchFieldProps {
  recipeData: IRecipe[];
  updateRecipes: (updatedRecipes: IRecipe[]) => void;
}

export const SearchField: React.FC<ISearchFieldProps> = ({
  recipeData,
  updateRecipes
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredRecipes = recipeData.filter(({ title }) => {
      return title.includes(searchTerm);
    });

    updateRecipes(filteredRecipes);
  }, [searchTerm]);

  const updateSearchField = (e: any) => setSearchTerm(e.target.value);

  return (
    <SearchFieldWrapper
      placeholder={"Search for recipe"}
      value={searchTerm}
      onChange={updateSearchField}
    />
  );
};

const SearchFieldWrapper = styled.input`
  width: 100%;
  font-size: 2.5rem;
`;

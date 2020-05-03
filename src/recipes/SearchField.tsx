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
    <SearchFieldWrapper>
      <label htmlFor={"recipe-search-field"}>
        <i className="fa fa-search"></i>
      </label>
      <input
        id={"recipe-search-field"}
        placeholder={"Søk etter oppskrift"}
        value={searchTerm}
        onChange={updateSearchField}
      ></input>
    </SearchFieldWrapper>
  );
};

const SearchFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 0.5rem;
  margin-bottom: 2rem;

  input {
    flex-grow: 1;

    padding: 0.5rem;
    border: 0;
    font-size: 2.5rem;
  }
  i {
    padding: 0 1rem;
  }
`;

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
    const regexp = new RegExp(searchTerm, "i");

    const filteredRecipes = recipeData.filter(({ title }) =>
      regexp.test(title)
    );

    updateRecipes(filteredRecipes);
  }, [searchTerm]);

  const updateSearchField = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };
  return (
    <SearchFieldWrapper>
      <label htmlFor={"recipe-search-field"}>
        <i className="fa fa-search"/>
      </label>
      <input
        id={"recipe-search-field"}
        placeholder={"Søk etter oppskrift"}
        value={searchTerm}
        onChange={updateSearchField}
        onKeyDown={e => {
          if (e.key === "Escape") {
            setSearchTerm("");
          }
        }}
      />
    </SearchFieldWrapper>
  );
};

const SearchFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
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

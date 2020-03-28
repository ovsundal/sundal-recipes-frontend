import * as React from "react";
import styled from "styled-components";
import { useState } from "react";

interface IAddRecipeProps {}

export const AddRecipe: React.FC<IAddRecipeProps> = ({}) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const updateFieldValue = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, id } = e.currentTarget;

    if (id === "recipe-title") {
      setTitle(value);
    } else if (id === "recipe-ingredients") {
      setIngredients(value);
    } else if (id === "recipe-instructions") {
      setInstructions(value);
    }
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const payloadJson = {
            title,
            ingredients,
            instructions
        };

      const response = await fetch(
        "https://sundal-recipes.herokuapp.com/api/recipes/addRecipe",
        // "http://localhost:5000/api/recipes/addRecipe",
        {
          method: "POST",
          body: JSON.stringify(payloadJson),
            headers: {
                "Content-Type": "application/json"
            }
        }
      );
      console.log(response);
    } catch (e) {
      console.log("failed to add recipe: ", e.toString());
    }
  };

  return (
    <AddRecipeWrapper onSubmit={submitForm}>
      <h1>Add Recipe</h1>
      <label>
        Title
        <input
          id={"recipe-title"}
          type={"text"}
          value={title}
          onChange={updateFieldValue}
        />
      </label>
      <label>
        Ingredients
        <input
          id={"recipe-ingredients"}
          type={"text"}
          value={ingredients}
          onChange={updateFieldValue}
        />
      </label>
      <label>
        instructions
        <input
          id={"recipe-instructions"}
          type={"text"}
          value={instructions}
          onChange={updateFieldValue}
        />
      </label>
      <button type={"submit"}>Add Recipe</button>
    </AddRecipeWrapper>
  );
};

const AddRecipeWrapper = styled.form``;

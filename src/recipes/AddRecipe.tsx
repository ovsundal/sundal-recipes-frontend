import * as React from "react";
import styled from "styled-components";
import { useState } from "react";

export const AddRecipe: React.FC = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([""] as string[]);
  const [instructions, setInstructions] = useState("");

  const updateFieldValue = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, id } = e.currentTarget;

    if (id === "recipe-title") {
      setTitle(value);
    } else if (id.includes("recipe-ingredients")) {
      const updateIngredients = [...ingredients];
      const inputFieldId = getIngredientInputFieldId(id);

      updateIngredients[inputFieldId] = value;
      setIngredients(updateIngredients);
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

  const addIngredientsInputField = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, id } = e.currentTarget;

    const inputFieldId = getIngredientInputFieldId(id);

    const lastInputFieldIsNotEmpty =
      inputFieldId !== -1 && ingredients[ingredients.length - 1] !== "";

    if (lastInputFieldIsNotEmpty) {
      const expandIngredientsList = [...ingredients];

      expandIngredientsList.push("");
      setIngredients(expandIngredientsList);
    }
  };

  return (
    <AddRecipeWrapper onSubmit={submitForm}>
      <h1>Ny oppskrift</h1>
      <label>
        Navn
        <input
          id={"recipe-title"}
          type={"text"}
          value={title}
          onChange={updateFieldValue}
        />
      </label>
      <label>
        Ingredienser
        {ingredients.map((item, index) => {
          return (
            <input
              key={index}
              id={`recipe-ingredients-${index}`}
              type={"text"}
              value={item}
              onKeyUp={addIngredientsInputField}
              onChange={updateFieldValue}
            />
          );
        })}
      </label>
      <label>
        Instruksjoner
        <input
          id={"recipe-instructions"}
          type={"textarea"}
          value={instructions}
          onChange={updateFieldValue}
        />
      </label>
      <button type={"submit"}>Add Recipe</button>
    </AddRecipeWrapper>
  );
};

const getIngredientInputFieldId = (id: string) => {
  const inputFieldIdArray = id.match(/\d+/);

  if (!inputFieldIdArray) {
    console.log("error, could not find ingredients input id");
    return -1;
  }

  return parseInt(inputFieldIdArray[0]);
};

const AddRecipeWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    display: block;
  }

  input {
    display: block;
  }
`;

import * as React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react/lib/es2015/main/ts";

export const AddRecipe: React.FC = () => {
  const [recipe, setRecipe] = useState("");
  const [recipeTitle, setRecipeTitle] = useState("Title");

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        recipe,
        recipeTitle
      };

      await fetch(
        "https://sundal-recipes.herokuapp.com/api/recipes/addRecipe",
        // "http://localhost:5000/api/recipes/addRecipe",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    } catch (e) {
      console.log("failed to add recipe: ", e.toString());
    }
  };

  const handleEditorChange = (e: any) => {
    const content = e.target.getContent();
    setRecipe(content);
  };

  const handleTitleChange = (e: any) => {
    const title = e.target.value;
    setRecipeTitle(title);
  };

  return (
    <AddRecipeWrapper>
      <form onSubmit={submitForm}>
        <input value={recipeTitle} onChange={handleTitleChange} />
        <Editor
          initialValue="
        <p><strong>Ingredienser</strong></p>
        <ul id=new-recipe-ingredients>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        <div id=new-recipe-instructions><strong>Instruksjoner</strong>
            <p>Lorem Ipsum</p>
        </div>
        "
          init={{
            height: 800,
            menubar: false,
            plugins: [
              "advlist autolink lists link image",
              "charmap print preview anchor help",
              "searchreplace visualblocks code",
              "insertdatetime media table paste wordcount"
            ],
            toolbar:
              "undo redo | formatselect | bold italic | \
                alignleft aligncenter alignright | \
                bullist numlist outdent indent | help"
          }}
          onChange={handleEditorChange}
        />
        <FormActionButton type={"submit"}>Add Recipe</FormActionButton>
      </form>
    </AddRecipeWrapper>
  );
};

const AddRecipeWrapper = styled.div`
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

export const FormActionButton = styled.button`
  background-color: #0069d9;
  font-size: 1.5rem;
  color: white;
`;

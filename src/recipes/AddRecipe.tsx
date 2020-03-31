import * as React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react/lib/es2015/main/ts";

export const AddRecipe: React.FC = () => {
  const [recipe, setRecipe] = useState("");

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        recipe
      };

      console.log(JSON.stringify(payload));

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

  return (
    <AddRecipeWrapper onSubmit={submitForm}>
      <Editor
        initialValue="<h2 id=new-recipe-title>Ny Oppskrift</p>
        <p></p>
        <p></p>
        <p><strong>Ingredienser</strong></p>
        <ul id=new-recipe-ingredients>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        <p></p>
        <p></p>
        <p id=new-recipe-instructions><strong>Instruksjoner</strong></p>
        "
        init={{
          height: 500,
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
      <button type={"submit"}>Add Recipe</button>
    </AddRecipeWrapper>
  );
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

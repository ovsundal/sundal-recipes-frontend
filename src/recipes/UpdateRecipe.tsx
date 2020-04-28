import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react/lib/es2015/main/ts";
import { AddRecipeWrapper } from "./RecipeItem";
import styled from "styled-components";
import { FormActionButton, RecipeTitle } from "./AddRecipe";

interface IUpdateRecipeProps {}

export const UpdateRecipe: React.FC<IUpdateRecipeProps> = ({ ...rest }) => {
  const { location, goBack }: any = useHistory();
  const { recipe: ingredients, title, id } = location.state.recipe;

  const [recipeId] = useState(id);
  const [recipeTitle, setRecipeTitle] = useState(title);
  const [recipe, setRecipe] = useState(ingredients);

  if (!id) {
    return null;
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        recipe,
        recipeTitle,
        recipeId
      };

      await fetch(
        "https://sundal-recipes.herokuapp.com/api/recipes/updateRecipe",
        // "http://localhost:5000/api/recipes/updateRecipe",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      // TODO: invoking goBack() after api call doesnt work - why?
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
    <UpdateRecipeWrapper>
      <form onSubmit={submitForm}>
        <RecipeTitle value={recipeTitle} onChange={handleTitleChange} />
        <Editor
          initialValue={recipe}
          init={{
            width: "80vw",
            height: "90vh",
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
        <FormActionButton type={"submit"}>Update Recipe</FormActionButton>
      </form>
    </UpdateRecipeWrapper>
  );
};

const UpdateRecipeWrapper = styled(AddRecipeWrapper)``;

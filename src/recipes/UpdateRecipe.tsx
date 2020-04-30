import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react/lib/es2015/main/ts";
import { AddRecipeWrapper } from "./RecipeItem";
import styled from "styled-components";
import {
  FormActionButton,
  FormWrapper,
  ITags,
  RecipeTitle,
  TagsDivider
} from "./AddRecipe";

interface IUpdateRecipeProps {}

export const UpdateRecipe: React.FC<IUpdateRecipeProps> = ({ ...rest }) => {
  const { location, goBack }: any = useHistory();
  const { recipe: ingredients, title, id } = location.state.recipe;

  const [recipeId] = useState(id);
  const [recipeTitle, setRecipeTitle] = useState(title);
  const [recipe, setRecipe] = useState(ingredients);
  const [tagData, setTagData] = useState([] as ITags[]);
  const [selectedTags, setSelectedTags] = useState([] as ITags[]);
  // TODO: refactor this into AddRecipes, too much code duplication here
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(
          "https://sundal-recipes.herokuapp.com/api/tags/getTags"
        );

        const { tags }: any = await response.json();

        setTagData(tags);
      } catch (e) {
        console.log("Error, could not get tags", e);
      }
    };

    fetchTags();
  }, []);

  if (!id) {
    return null;
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        recipe,
        recipeTitle,
        recipeId,
        recipeTags: selectedTags
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

  const renderTags = (tagData: ITags[]) => {
    console.log(selectedTags);

    return (
      <TagsDivider>
        {tagData.map(({ id, name }) => (
          <label key={id}>
            {name}
            <input id={id} type={"checkbox"} onChange={handleTagChange} />
          </label>
        ))}
      </TagsDivider>
    );
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    const selectedTag = tagData.find(tag => tag.id === id);
    let copySelectedTags: ITags[] = [...selectedTags];

    if (checked && selectedTag) {
      copySelectedTags.push(selectedTag);
    } else {
      copySelectedTags = copySelectedTags.filter(tag => tag.id !== id);
    }
    setSelectedTags(copySelectedTags);
  };

  return (
    <FormWrapper onSubmit={submitForm}>
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
      {renderTags(tagData)}
      <FormActionButton type={"submit"}>Update Recipe</FormActionButton>
    </FormWrapper>
  );
};

const UpdateRecipeWrapper = styled(AddRecipeWrapper)``;

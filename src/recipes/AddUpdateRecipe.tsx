import * as React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react/lib/es2015/main/ts";
import { IRecipe } from "./RecipeItem";
import { GLOBAL_API } from "../common/constants";
import { useHistory } from "react-router-dom";

export interface ITags {
  _id: string;
  id: string;
  name: string;
}

interface IAddUpdateRecipe {
  token: string;
}

const newRecipeBoilerPlateText = `
        <p><strong>Ingredienser</strong></p>
        <ul id=new-recipe-ingredients>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        <div id=new-recipe-instructions><strong>Instruksjoner</strong>
            <p>Lorem Ipsum</p>
        </div>
        `;

export const AddUpdateRecipe: React.FC<IAddUpdateRecipe> = ({ token }) => {
  const [recipeId, setRecipeId] = useState("");
  const [recipe, setRecipe] = useState("");
  const [recipeTitle, setRecipeTitle] = useState("");
  const [tagData, setTagData] = useState([] as ITags[]);
  const [selectedTags, setSelectedTags] = useState([] as ITags[]);
  const { location, goBack }: any = useHistory();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`${GLOBAL_API}tags/getTags`);

        const { tags }: { tags: ITags[] } = await response.json();
        const existingTags = [] as ITags[];

        setTagData(tags);

        location.state.recipe.tags.forEach((t: string) => {
          const foundTag = tags.filter(({ id }) => id === t)[0];
          existingTags.push(foundTag);
        });

        setSelectedTags(existingTags);
        setTagData(tags);
      } catch (e) {
        console.log("Error, could not get tags", e);
      }
    };

    fetchTags();
  }, []);

  // if this is an update, fill existing values
  useEffect(() => {
    if (location.state) {
      const { recipe: ingredients, title, id, tags } = location.state.recipe;
      setRecipeId(id);
      setRecipeTitle(title);
      setRecipe(ingredients);
    }
  }, []);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let payload: any = {
        recipe,
        recipeTitle,
        recipeId,
        recipeTags: selectedTags
      };

      let url = `${GLOBAL_API}recipes/addRecipe`;

      if (recipeId) {
        url = `${GLOBAL_API}recipes/updateRecipe`;

        payload = {
          recipe,
          recipeTitle,
          recipeId,
          recipeTags: selectedTags
        };
      }

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        }
      });

      // return user if saved
      if (response) {
        goBack();
      }
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

  const renderTags = (tagData: ITags[]) => (
    <TagsDivider>
      {tagData &&
        tagData.map(({ id, name }) => {
          const isChecked = selectedTags.filter(
            (tag: ITags) => tag.id === id
          )[0];

          return (
            <label key={id}>
              {name}
              <input
                id={id}
                type={"checkbox"}
                onChange={handleTagChange}
                checked={!!isChecked}
              />
            </label>
          );
        })}
    </TagsDivider>
  );

  return (
    <FormWrapper onSubmit={submitForm}>
      <RecipeTitle
        placeholder={"Recipe title"}
        value={recipeTitle}
        onChange={handleTitleChange}
      />
      <Editor
        initialValue={recipe || newRecipeBoilerPlateText}
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
      <FormActionButton type={"submit"}>
        {recipeId ? "Update Recipe" : "Add Recipe"}
      </FormActionButton>
    </FormWrapper>
  );
};

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    display: block;
  }
`;

export const RecipeTitle = styled.input`
  display: block;
  width: 100%;
  margin: 1rem 0;

  font-size: 2rem;
`;

export const TagsDivider = styled.div``;

export const FormActionButton = styled.button`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 5rem;

  background-color: #0069d9;
  font-size: 2rem;
  color: white;
`;

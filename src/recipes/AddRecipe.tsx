import * as React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react/lib/es2015/main/ts";
import { IRecipe } from "./RecipeItem";

interface ITags {
  _id: string;
  id: string;
  name: string;
}

export const AddRecipe: React.FC = () => {
  const [recipe, setRecipe] = useState("");
  const [recipeTitle, setRecipeTitle] = useState("");
  const [tagData, setTagData] = useState([] as ITags[]);
  const [selectedTags, setSelectedTags] = useState([] as ITags[]);

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

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        recipe,
        recipeTitle,
        recipeTags: selectedTags
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

  // TODO: add clickhandler here and hookup selected checkboxes to selectedTags. Do this in UpdateRecipe too.
  return (
    <FormWrapper onSubmit={submitForm}>
      <RecipeTitle
        placeholder={"Recipe title"}
        value={recipeTitle}
        onChange={handleTitleChange}
      />
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
      <TagsDivider>
        {tagData.map(({ id, name }) => (
          <label key={id}>
            {name}
            <input id={id} type={"checkbox"} onChange={handleTagChange} />
          </label>
        ))}
      </TagsDivider>
      <FormActionButton type={"submit"}>Add Recipe</FormActionButton>
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
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

  background-color: #0069d9;
  font-size: 2rem;
  color: white;
`;

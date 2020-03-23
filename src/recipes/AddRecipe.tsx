import * as React from 'react'
import styled from "styled-components";

interface IAddRecipeProps {

}

export const AddRecipe: React.FC<IAddRecipeProps> = ({}) => {



    return(
        <AddRecipeWrapper>
            <label>
                Title
                <input type={'text'} />
            </label>
        </AddRecipeWrapper>
    )
}

const AddRecipeWrapper = styled.form`

`;

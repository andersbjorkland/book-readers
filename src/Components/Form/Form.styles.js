import styled from "styled-components";

export const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;



    label {
        margin-right: 0.3rem;
        min-width: 10rem;
    }

    input {
        min-width: 15rem;
        width: 60%;
        max-width: 30rem;
    }

    input[type="submit"] {
        min-width: 4rem;
        width: 6rem;
        height: 2rem;
        color: var(--green);
        background-color: white;
        border: 1px var(--green) solid;
    }
`;
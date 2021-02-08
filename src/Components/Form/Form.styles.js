import styled from "styled-components";

export const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    width: auto;
    align-items: center;

    label {
        margin-top: 1rem;
        margin-right: 0.3rem;
        margin-bottom: 0;

        min-width: 10rem;
    }

    input, textarea, label, p, &>div {
        min-width: 15rem;
        width: 100%;
        max-width: 40rem;
    }

    textarea {
        height: 20rem;
    }

    input[type="submit"] {
        min-width: 4rem;
        width: 6rem;
        height: 2rem;
        color: var(--green);
        background-color: white;
        border: 1px var(--green) solid;
    }

    input[type="checkbox"] {
        min-width: fit-content;
        width: fit-content;
        margin-left: 0.1rem;
    }

    p.form-hint, .form-hint {
        margin: 0;
        font-size: 0.8rem;
        color: var(--solidGreen);

        &--required {
            color: var(--orange);
        }
    }
`;
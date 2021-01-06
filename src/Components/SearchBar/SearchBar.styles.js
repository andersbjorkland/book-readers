import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;

    .text-input {
        height: 2rem;
        border-color: var(--blue);
        border-width: 1.5px;
        border-right: none;
    }

    a.button, .button {
        text-decoration: none;
        color: white;

        height: 2rem;
        min-width: 5rem;
        padding: 0.3rem;
        background-color: var(--blue);
        transition: 0.5s;

        &:hover {
            background-color: var(--lighterBlue);
        }
    }
`;
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        // COLORS
        --offWhite: #f2f2f2;
        --blue: #04151F;
        --green: #183A37;
        --beige: #EFD6AC;
        --orange: #C44900;
        --purple: #432534;

        background-color: var(--offWhite);
        padding: 1rem;
    }

    * {
        box-sizing: border-box;
    }
`;

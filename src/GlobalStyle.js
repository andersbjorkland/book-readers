import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        // COLORS
        --offWhite: #f2f2f2;
        --blue: #04151F;
        --lighterBlue: #184166;
        --green: #183A37;
        --beige: #EFD6AC;
        --orange: #C44900;
        --purple: #432534;

        // SISEZ
        --mediumText: 17px;

        background-color: var(--offWhite);
        padding: 1rem;

        h1, h2, h3, h4, h5, h6 {
            font-family: 'Crimson Text', serif;
        }
        p {
            font-family: 'Montserrat', sans-serif;
        }

    }

    * {
        box-sizing: border-box;
    }

    .flex-row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .margin-left--auto {
        margin-left: auto;
    }

    .md-width {
        max-width: 800px;
    }

    .m-center {
        margin: auto;
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

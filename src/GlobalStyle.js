import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        // COLORS
        --offWhite: #f2f2f2;
        --blue: #04151F;
        --lighterBlue: #184166;
        --whiteBlue: #e8f0ff;
        --green: #183A37;
        --lightGreen: #68eded;
        --beige: #EFD6AC;
        --orange: #C44900;
        --purple: #432534;

        // SIZES
        --mediumText: 17px;

        // DIMENSIONS
        --maxWidth: 800px;

        background-color: var(--offWhite);

        h1, h2, h3, h4, h5, h6 {
            font-family: 'Crimson Text', serif;
        }
        p {
            font-family: 'Montserrat', sans-serif;
        }

    }

    .app-container {
        padding: 1rem;
        display: flex;
        flex-direction: column;

        h1 {
            text-align: center;
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

    .flex-column {
        display: flex;
        flex-direction: column;
    }

`;

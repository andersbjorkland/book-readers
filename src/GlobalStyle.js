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

        h1, h2, h3, h4, h5, h6, .serif {
            font-family: 'Crimson Text', serif;
        }
        p, .sans-serif {
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

    .gap {
        &--sm {
            gap: 0.5rem;
        }
    }

    .bg{
        &--white {
            background-color: white;
        }
    }

    .margin-left--auto, .ml-auto {
        margin-left: auto;
    }

    .mt-auto {
        margin-top: auto;
    }
    .mt-0 {
        margin-top: 0;
    }

    .md-width {
        max-width: 800px;
    }

    .m-center {
        margin: auto;
    }

    .text-center {
        text-align: center;
    }

    .no-ul {
        text-decoration: none;
    }

    a.button, .button {
        text-decoration: none;
        color: white;
        border: none;
        border-radius: 0.2rem;

        height: 2rem;
        min-width: 5rem;
        padding: 0.3rem;
        background-color: var(--blue);
        transition: 0.5s;

        display: flex;
        justify-content: center;
        align-items: center;

        &--white {
            background-color: white;
            color: var(--blue);
        }

        &:hover {
            opacity: 0.8;
        }

        &--outline {
            text-decoration: none;
            padding: 0.3rem;
            transition: 0.5s;

            background-color: none;
            color: var(--lighterBlue);
            border: var(--lighterBlue) 2px solid;
            border-radius: 0.2rem;

            display: flex;
            justify-content: center;
            align-items: center;
        }

        &--small {
            height: 1.6rem;
            width: 1.6rem;
            padding: 0;
            margin: 0;

            * {
                height: 1rem;
            }
        }
    }

    .flex-column {
        display: flex;
        flex-direction: column;
    }

`;

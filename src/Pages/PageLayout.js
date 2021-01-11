import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
`;

export const Container = styled.div`
    width: 100%;
    padding: 1rem;
    max-width: 1200px;

    .summary {
        h2 {
            margin: 0 0 0.5rem 0;
        }
        p {
            margin: 0 0 0.5rem 0;
            font-size: 0.95rem;
        }
    }

    .cursive {
        * {
            font-style: italic;
        }
    }
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    text-align: center;

    h1 {
        margin: 0;
    }
    p {
        margin: 0;
    }
    img {
        align-self: center;
        max-width: 20rem;
        width: auto;
        height: auto;
    }
`;

export const Flexed = styled.div`
    width: 100%;
    display: grid;

    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    gap: 2rem;

    img {
        max-width: 100%;
        width: auto;
    }
`;
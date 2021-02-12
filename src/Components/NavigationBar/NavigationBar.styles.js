import styled from "styled-components";

export const Wrapper = styled.div`
    background-color: var(--lighterBlue);
    color: white;
    padding: 1rem 3rem;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    img {
        height: auto;
        width: auto;
        max-height: 2.5rem;

        /* padding: 0.2rem; */
        /* background-color: rgba(0, 0, 0, 0.4); */
        border-radius: 50%;
        
        @media screen and (max-width: 680px) {
            max-height: 2rem;
            padding: 0.2rem;
            background-color: rgba(0, 0, 0, 0.4);
        }
    }

    a {
        color: white;
        &.black {
            color: var(--blue);
        }
    }

    .brand {
        display: flex;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.4);
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        padding: 0 1rem 0 0.4rem;

        a {
            font-size: 1.6rem;
            color: var(--whiteOrange);
        }
    }

    @media screen and (max-width: 680px) {
        .optional {
            display: none;
        }

        .brand {
            background: none;
        }

        font-size: 0.95rem;
    }
`;


export const Nav = styled.nav`
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: row;
`;

export const LinkContainer = styled.nav`
    margin-left: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
`;
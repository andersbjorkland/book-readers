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

        padding: 0.2rem;
        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        
        @media screen and (max-width: 680px) {
            max-height: 2rem;
        }
    }

    a {
        color: white;
        &.black {
            color: var(--blue);
        }
    }

    @media screen and (max-width: 680px) {
        .optional {
            display: none;
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
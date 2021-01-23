import styled from "styled-components";

export const Wrapper = styled.div`
    background-color: var(--lighterBlue);
    color: white;
    padding: 1rem 3rem;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;

    a {
        color: white;
        &.black {
            color: var(--blue);
        }
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
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 1rem;
`;
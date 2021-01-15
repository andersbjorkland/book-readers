import styled from "styled-components";

export const BarWrapper = styled.div`
    background-color: var(--lighterBlue);
    color: white;
    padding: 1rem;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

export const InnerContainer = styled.div`
    max-width: var(--maxWidth);

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;

    font-size: 0.9rem;
`;
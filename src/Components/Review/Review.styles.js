import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    
    display: flex;
    justify-content: center;
`;

export const Content = styled.div`
    margin: auto;
    width: 100%;
    min-width: 20rem;
    max-width: var(--maxWidth);
`;

export const SummaryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    p {
        margin: 0;
    }
`;
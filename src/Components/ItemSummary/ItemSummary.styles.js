import styled from "styled-components";

const ITEM_PADDING = "1rem";

export const Wrapper = styled.div`
    max-width: 25rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    font-size: 14px;

    .bottom {
        margin-top: auto;
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${ITEM_PADDING};
    height: 100%;
    gap: 0.5rem;

    h3 {
        font-size: 0.9em;
        margin-bottom: 0.3em;
    }
    p {
        font-size: 0.85em;
        margin: 0;
    }

    .img-placeholder, img {
        margin: 0 auto;
        width: auto;
        height: 8em;
    }
`;

export const ItemHeader = styled.div`
    min-height: 5em;
    overflow-y: auto;
    background-color: var(--blue);
    color: white;
    padding: 0.5em ${ITEM_PADDING};
    display: flex;
    flex-direction: column;

    h3 {
        margin: 0;
        font-size: 0.9em;
    }
    p {
        font-size: 0.9em;
        margin: 0;
    }
`;

export const ItemFooter = styled.div`
    margin-top: auto;
    height: 5em;
    overflow-y: auto;
    color: var(--blue);
    padding: ${ITEM_PADDING};

    h4 {
        margin: 0;
        font-size: 0.9em;
    }
    p {
        font-size: 0.9em;
        margin: 0;
    }
`;
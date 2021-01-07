import styled from "styled-components";

export const Wrapper = styled.div`
    margin-top: 1em;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    color: var(--lighterBlue);

    a {
        color: var(--lighterBlue);
        
        &.active {
            font-weight: bold;

            &:visited {
                color: var(--lighterBlue);
            }
        }

        &:visited {
            color: var(--purple);
        }
    }
`;
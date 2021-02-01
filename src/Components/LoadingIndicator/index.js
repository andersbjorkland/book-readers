import styled from "styled-components";

const LoadingIndicator = ({smaller}) => {
    return (
        <Wrapper>
            <LoaderContainer>
                <SmallLoader />
            </LoaderContainer>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    padding: 1rem 0;
    display: flex;
    justify-content: center;
`;

const LoaderContainer = styled.div`
    width: 2.25rem;
    height: 2.25rem;
    padding: 0.5rem;

    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
`;

const SmallLoader = styled.div`
    height: 0.5rem;
    width: 0.5rem;

    background-color: var(--blue);
    border-radius: 50%;
   
`;

export default LoadingIndicator;
import styled from "styled-components";

const SmallLoadingIndicator = () => {
    return (
        <LoaderContainer>
            <SmallLoader />
        </LoaderContainer>
    );
}

const LoaderContainer = styled.div`
    width: 4rem;
    animation: pingpong 2s linear infinite;
    overflow: hidden;
    
`;

const SmallLoader = styled.div`
    height: 0.5rem;
    width: 0.5rem;

    background-color: var(--blue);
    border-radius: 50%;

    @keyframes pingpong {
        0% {
            margin-left: 10%;
        }
        50% {
            margin-left: 90%;
        }
        100% {
            margin-left: 10%;
        }
    }
   
`;

export default SmallLoadingIndicator;
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    border: 2px var(--lighterBlue) solid;
    border-radius: 2px;
    height: 1.6rem;
    width: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    transition: 0.8s;


    &.animate {
        border-radius: 50%;

        &>.hor {
            animation: circlingH 2s linear infinite;

            @keyframes circlingH {
                0% {
                    transform: rotate(90deg);
                }
                100% {
                    transform: rotate(450deg);
                }
            }
        }
        &>.vert {
            animation: circlingV 2s linear infinite;

            @keyframes circlingV {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        }
    }
`;

const Line = styled.div`
    width: 0.2em;
    height: 1em;
    background-color: var(--lighterBlue);
    position: absolute;

    &.hor {
        transform: rotate(90deg);
    }

`;

const Add = ({onClick, animateOnClick}) => {
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const handleClick = () => {
        if (animateOnClick) {
            setShouldAnimate(true);
        }
        onClick();
    }

    return (
        <Wrapper className={shouldAnimate ? "animate" : ""} onClick={handleClick}>
            <Line className="hor" />
            <Line className="vert"/>
        </Wrapper>
    );
}

export default Add;
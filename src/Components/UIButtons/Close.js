import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    border: 2px var(--blue) solid;
    border-radius: 2px;
    height: 1.6em;
    width: 1.6em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    transition: 0.8s;


    &.close-animation {
        border-radius: 50%;

        &>.left {
            animation: circlingL 2s linear infinite;

            @keyframes circlingL {
                0% {
                    transform: rotate(45deg);
                }
                100% {
                    transform: rotate(405deg);
                }
            }
        }
        &>.right {
            animation: circlingR 2s linear infinite;

            @keyframes circlingR {
                0% {
                    transform: rotate(-45deg);
                }
                100% {
                    transform: rotate(315deg);
                }
            }
        }
    }
`;

const Line = styled.div`
    width: 0.2em;
    height: 1em;
    background-color: var(--blue);
    position: absolute;

    &.left {
        transform: rotate(-45deg);
    }
    &.right {
        transform: rotate(45deg);
    }

`;

const Close = ({onClose, animateOnClick}) => {
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const handleClick = () => {
        if (animateOnClick) {
            setShouldAnimate(true);
        }
        onClose();
    }

    return (
        <Wrapper className={shouldAnimate ? "close-animation" : ""} onClick={handleClick}>
            <Line className="left" />
            <Line className="right"/>
        </Wrapper>
    );
}

export default Close;
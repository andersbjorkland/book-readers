import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    border: 2px var(--blue) solid;
    border-radius: 2px;
    height: 1.5em;
    width: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;

    /* position: absolute; */
    /* top: 0.5em;
    right: 0.5em; */

    &.close-animation {
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
        console.log("Close was clicked.", animateOnClick);
        if (animateOnClick) {
            console.log("Setting animation on.");
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
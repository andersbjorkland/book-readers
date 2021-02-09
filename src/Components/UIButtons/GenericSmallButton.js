import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    border: 2px var(--lighterBlue) solid;
    border-radius: 4px;
    height: 1.6rem;
    width: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: var(--lighterBlue);
    transition: 0.8s;


    &.animate {
        border-radius: 50%;

        &>* {
            animation: circling 2s linear infinite;

            @keyframes circling {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        }
    }

    .tooltip {
        visibility: hidden;
        width: 120px;
        background-color: black;
        color: #fff;
        text-align: center;
        padding: 5px 0;
        border-radius: 6px;

        position: absolute;
        z-index: 1;
    }

    &:hover .tooltip {
        visibility: visible;
    }
`;


const GenericSmallButton = ({onClick, animateOnClick, isLoading, tooltip, ...props}) => {
    const handleClick = () => {
        onClick();
    }

    const tooltipElement = tooltip ? <div className="tooltiptext">{tooltip}</div> : null;

    return (
        <Wrapper className={("tooltip ") + (isLoading && "animate")} onClick={handleClick}>
            {isLoading ? null : tooltipElement}
            {props.children}
        </Wrapper>
    );
}

export default GenericSmallButton;
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    border: 2px var(--lighterBlue) solid;
    border-radius: 2px;
    height: 1.5em;
    width: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;

    .animate {

    }

`;

const GenericSmallButton = ({onClick, animateOnClick}, props) => {
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const handleClick = () => {
        console.log("Button was clicked.", animateOnClick);
        if (animateOnClick) {
            console.log("Setting animation on.");
            setShouldAnimate(true);
        }
        onClick();
    }

    return (
        <Wrapper className={shouldAnimate ? "animate" : ""} onClick={handleClick}>
            {props.children}
        </Wrapper>
    );
}

export default GenericSmallButton;
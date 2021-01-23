import { useState } from "react";
import styled from "styled-components";
import SmallLoadingIndicator from "../LoadingIndicator/SmallLoadingIndicator";

const Button = styled.button`
    height: 2rem;
    border: 4px solid ${props => props.border ? props.border : "var(--blue)"};
    border-radius: 4px;
    color: ${props => props.color ? props.color : (props.border ? props.border : "var(--blue)")};
    box-shadow: 4px 4px 4px #ededed;
    overflow: hidden;
    outline: none;
    background-color: white;

    font-weight: bold;
`;

const ButtonWithLoading = ({children, className, border, color, onClick, isLoading}) => {
    const handleClick = () => {
        onClick();
    } 
    return (
        <Button className={className} color={color} border={border} onClick={handleClick} >
            { isLoading ? <SmallLoadingIndicator /> : children}
        </Button>
    );
}

export default ButtonWithLoading;
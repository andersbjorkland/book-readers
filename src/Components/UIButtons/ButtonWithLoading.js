import { useState } from "react";
import styled from "styled-components";
import LoadingIndicator from "../LoadingIndicator";
import SmallLoadingIndicator from "../LoadingIndicator/SmallLoadingIndicator";

const Button = styled.button`
    height: 2rem;
    background-color: white;
    color: var(--blue);
    border: none;
    box-shadow: 4px 4px 4px #ededed;
    overflow: hidden;
    outline: none;
`;

const ButtonWithLoading = ({children, className, onClick, isLoading}) => {
    const [showLoading, setShowLoading] = useState(false);
    const handleClick = () => {
        setShowLoading(true);
        onClick();
    } 
    return (
        <Button className={className} onClick={handleClick}>
            {showLoading || isLoading ? <SmallLoadingIndicator /> : children}
        </Button>
    );
}

export default ButtonWithLoading;
import styled from "styled-components";
import LoadingIndicator from "../LoadingIndicator";

const Button = styled.button`
    height: 2rem;
    background-color: white;
    color: var(--blue);
    
    &.border {
        border: 0.5px solid var(--blue);
    }

    &.no-border {
        border: none;
    }
`;

const GenericButton = ({ isLoading, ...props}) => {
    if (isLoading) {
        return <LoadingIndicator />
    }

    return (
        <Button className={props.outline ? "border" : "no-border"} onClick={props.onClick}>
            {props.children}
        </Button>
    );
}

export default GenericButton;
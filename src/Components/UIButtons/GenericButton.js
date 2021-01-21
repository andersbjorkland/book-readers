import styled from "styled-components";

const Button = styled.button`
    height: 2rem;
    background-color: white;
    color: var(--blue);
    border: none;
`;

const GenericButton = (props) => {
    return (
        <Button onClick={props.onClick}>
            {props.children}
        </Button>
    );
}

export default GenericButton;
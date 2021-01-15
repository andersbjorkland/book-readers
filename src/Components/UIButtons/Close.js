import styled from "styled-components";

const Wrapper = styled.div`
    border: 2px var(--blue) solid;
    border-radius: 2px;
    height: 1.5em;
    width: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0.5em;
    right: 0.5em;
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

const Close = ({onClose}) => {
    return (
        <Wrapper onClick={onClose}>
            <Line className="left" />
            <Line className="right"/>
        </Wrapper>
    );
}

export default Close;
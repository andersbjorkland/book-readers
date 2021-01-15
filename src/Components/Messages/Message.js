import {useState} from "react";
import styled from "styled-components";
import Close from "../UIButtons/Close";

const Wrapper = styled.div`
    max-width: 40rem;
    padding: 1rem;
    border: 2px ${props => props.color} solid;
    background-color: white;
    color: var(--lighterBlue);

    position: relative;
`;


const Message = ({color, children}) => {

    const [isClosed, setIsClosed] = useState(false);

    if (isClosed) {
        return null;
    }

    const onClose = () => {
        setIsClosed(true);
    }

    return (
        <Wrapper color={color}>
            {children}
            <Close onClose={onClose}/>
        </Wrapper>
    );
}

export default Message;
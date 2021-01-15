import Message from "./Message";

const InfoMessage = (props) => {
    return (<Message color="var(--lighterBlue)">{props.children}</Message>)
}

export default InfoMessage;
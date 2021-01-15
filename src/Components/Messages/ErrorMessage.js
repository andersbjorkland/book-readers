import Message from "./Message";

const ErrorMessage = (props) => {
    return (<Message color="var(--orange)">{props.children}</Message>)
}

export default ErrorMessage;
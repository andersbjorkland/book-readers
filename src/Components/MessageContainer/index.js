import { Wrapper } from "./MessageContainer.styles"

const MessageContainer = (props) => {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    )

}

export default MessageContainer;
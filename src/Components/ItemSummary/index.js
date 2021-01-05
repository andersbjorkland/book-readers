import { Wrapper } from "./ItemSummary.styles";

const ItemSummary = (props) => {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    );
}

export default ItemSummary;
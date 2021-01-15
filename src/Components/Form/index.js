import {FormWrapper} from "./Form.styles";

const Form = (props) => {
    return (
        <FormWrapper onSubmit={props.onSubmit}>
            {props.children}
        </FormWrapper>
    );
}

export default Form;
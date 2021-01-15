import Register from "../../Components/Register";
import { Container, Wrapper } from "../PageLayout";

const RegisterPage = () => {
    return (
        <Wrapper>
            <Container>
                <h1>Register</h1>
                <Register />
            </Container>
        </Wrapper>
        
    );
}

export default RegisterPage;
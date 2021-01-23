import Register from "../../Components/Register";
import { Container, Wrapper } from "../PageLayout";

const RegisterPage = () => {
    return (
        <Wrapper>
            <Container>
                <h1>Register</h1>
                <h2>Terms</h2>
                <p>
                    This is a beta-product. Features and functionality will change during this phase. Terms and conditions will 
                    be updated as the service evolves.
                </p>
                <p>
                    As a user you are expected to be decent and refrain from deragotory statements and behaviors. Failing to do 
                    so could lead to suspension or termination from using this service.
                </p>
                <p>
                    This service will use cookies for basic functionality such as user authentication and user features ('My Corner'). 
                    Authentication, user data and book data goes through andersbjorkland.online where server-side logic is hosted. 
                    User data is authentication credentials (including email) and books added to the user's different lists. It also 
                    contains data on the user's reviews and interactions generated through using this service.
                </p>
                <p>
                    If you agree to this terms and conditions, you are free to register as a user.
                </p>
                <p>
                    Be kind and read a book.
                </p>
                <Register />
            </Container>
        </Wrapper>
        
    );
}

export default RegisterPage;
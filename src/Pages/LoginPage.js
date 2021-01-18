import { Container, Wrapper } from "./PageLayout";
import Login from "../Components/Login";
import { Link } from "react-router-dom";

const LoginPage = (props) => {
   
    return (
        <Wrapper>
          <Container>
            <h1>Login</h1>
            <Login props={props} />
            <p>New user? <Link to="/register">Register</Link></p>
          </Container>
        </Wrapper>
    );
}

export default LoginPage;
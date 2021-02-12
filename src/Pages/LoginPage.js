import { CenteredContent, Container, Wrapper } from "./PageLayout";
import Login from "../Components/Login";
import { Link } from "react-router-dom";

const TARGET_URL = window.location.hostname === 'localhost' ? process.env.REACT_APP_ROOT_URL_DEV : process.env.REACT_APP_ROOT_URL;

const resetFrame = (
    <a href={TARGET_URL + "/reset-password"}>Reset</a>
);

const LoginPage = (props) => {

    return (
        <Wrapper>
          <Container>
            <CenteredContent>
              <h1>Login</h1>
              <Login props={props} />
              <div className="flex-column">
                <p>New user? <Link to="/register">Register</Link></p>
                <p className="mt-0">Forgot password? {resetFrame}</p>
                
              </div>
            </CenteredContent>
          </Container>
        </Wrapper>
    );
}

export default LoginPage;
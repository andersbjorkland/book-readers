import { CenteredContent, Container, Wrapper } from "./PageLayout";
import Login from "../Components/Login";
import { Link } from "react-router-dom";
import { useState } from "react";
import GenericButton from "../Components/UIButtons/GenericButton";

const TARGET_URL = window.location.hostname === 'localhost' ? process.env.REACT_APP_ROOT_URL_DEV : process.env.REACT_APP_ROOT_URL;

const resetFrame = (
  <div className="flex-column">
    <iframe title="reset-password" src={TARGET_URL + "/reset-password"} frameborder="0">...loading</iframe>
  </div>
);

const LoginPage = (props) => {

  const [forgotten, setForgotten] = useState(false);
   
    return (
        <Wrapper>
          <Container>
            <CenteredContent>
              <h1>Login</h1>
              <Login props={props} />
              <p>New user? <Link to="/register">Register</Link></p>
            </CenteredContent>
            <div className="flex-column">
              <GenericButton className="mr-auto" onClick={() => setForgotten(!forgotten)}>Forgot password?</GenericButton>
              {forgotten && resetFrame}
            </div>
          </Container>
        </Wrapper>
    );
}

export default LoginPage;
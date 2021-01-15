import {useEffect, useState} from "react";
import {useHistory} from "react-router";
import { loginUser, useAuthDispatch, useAuthState } from "../../Context";
import Form from "../Form";
import LoadingIndicator from "../LoadingIndicator";
import MessageContainer from "../MessageContainer";
import ErrorMessage from "../Messages/ErrorMessage";
import InfoMessage from "../Messages/InfoMessage";
import { Wrapper } from "./Login.styles";

const Login = (props) => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [success, setSuccess] = useState(false);

    const [messages, setMessages] = useState([]);
    const [messageKey, setMessageKey] = useState(0);

    const dispatch = useAuthDispatch();
    const { loading, errorMessage, userDetails } = useAuthState();
    const history = useHistory();

    useEffect(() => {
        if (errorMessage) {
            updateErrors();
        }
    },[errorMessage]);

    const updateErrors = () => {
        const messageArr = [];
        messageArr.push(<ErrorMessage key={messageKey}><p>{errorMessage}</p></ErrorMessage>);
        setMessages(messageArr);
        setMessageKey(messageKey + 1);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        let payload = {email, password};
        try {
            let response = await loginUser(dispatch, payload); //loginUser action makes the request and handles all the neccessary state changes
            if (!response || !response.user) {
                if (errorMessage) {
                    updateErrors();
                }
                return;
            }
            setSuccess(true);
            redirectOnLogin();
        } catch (error) {
            console.log(error);
        }
    }

    const inputEmail = (event) => {
        setEmail(event.target.value);
    }
  
    const inputPassword = (event) => {
        setPassword(event.target.value);
    }

    const redirectOnLogin = () => {
        setTimeout(() => {
            history.push('/');
        }, 5000);
    }

    if (success) {
       return <MessageContainer><InfoMessage>You have successfully logged in! Redirecting to Home.</InfoMessage></MessageContainer>
    }

    if (userDetails && userDetails.user) {
        return <InfoMessage>You are already logged in.</InfoMessage>;
    }

    return (
        <Form onSubmit={handleLogin}>
            <Wrapper>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" onKeyUp={inputEmail} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" onKeyUp={inputPassword}/>
                </div>

                <input type="submit" />

            </Wrapper>

            {loading ? <LoadingIndicator />  : null}
            { messages ? <MessageContainer>{messages}</MessageContainer> : null }
        </Form>
    );
}

export default Login;
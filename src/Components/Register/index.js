import axios from "axios";
import { useEffect, useState } from "react";
import Form from "../Form";
import LoadingIndicator from "../LoadingIndicator";

const ROOT_URL = window.location.hostname === 'localhost' ? process.env.REACT_APP_ROOT_URL_DEV : process.env.REACT_APP_ROOT_URL;


const Register = ({setUser}) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const updateEmail = (event) => {
        setEmail(event.target.value);
    }

    const updatePassword = (event) => {
        setPassword(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (!email || !password ) {
            console.log(" not!");
        } else {
            register();
        }
    }

    const register = () => {
        setIsLoading(true);
        axios({
            method: 'post',
            url: ROOT_URL + '/api/users',
            data: {email: email, password: password}
        })
        .then(response => {
            setStatus(response.status);
            setIsLoading(false);
        })
        .catch( error => {
            setIsLoading(false);
            setStatus(400);
        });
    }

    useEffect(() => {
        if (status) {
            if (status < 300){
                setMessage(
                    <div>
                        <p>You have successfully registered. Check your email ({email}) to verify your new account.</p>
                    </div>
                );
            } else {
                setMessage(<p>Something went wrong [Status code: {status}]. Try again.</p>)
            }
        }
    }, [status, email]);

    if (status && status < 300) {
        return message;
    }

    return (
        <>
            {message}
            <Form onSubmit={onSubmit} >
                <div className="flex-column">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required onKeyUp={updateEmail}/>
                </div>
                <div className="flex-column">
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" required onKeyUp={updatePassword}/>
                </div>

                <div className="mt-1">
                    {isLoading ? <LoadingIndicator /> : <input type="submit" value="Register"/>}
                </div>
                
            </Form>
        </>
    );
}

export default Register;
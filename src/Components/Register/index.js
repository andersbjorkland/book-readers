import { useEffect, useState } from "react";

const Register = ({setUser}) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState(null);

    const updateEmail = (event) => {
        setEmail(event.target.value);
    }

    const updatePassword = (event) => {
        setPassword(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting... ");

        if (!email || !password ) {
            console.log(" not!");
        } else {
            register();
        }
    }

    const register = () => {
        console.log("Registering... ");
        fetch("https://localhost:8000/api/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        .then(response => {
            console.log(response);
            setStatus(response.status);
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
    }, [status]);

    if (status && status < 300) {
        return message;
    }

    return (
        <>
            {message}
            <form onSubmit={onSubmit} >
                <div className="flex-column">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required onKeyUp={updateEmail}/>
                </div>
                <div className="flex-column">
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" required onKeyUp={updatePassword}/>
                </div>
                <input type="submit" value="Submit"/>
            </form>
        </>
    );
}

export default Register;
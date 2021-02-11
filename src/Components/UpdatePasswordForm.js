import { useState } from "react"

import Form from './Form';

const UpdatePasswordForm = ({onSubmit}) => {
    const [password, setPassword] = useState('');
    const [retypedPassword, setRetypedPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password.localeCompare(retypedPassword) === 0) {
            setMessage("");
            onSubmit(password);
        } else {
            setMessage("Passwords doesn't match.")
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" onChange={event => setPassword(event.target.value)}/>

            <label htmlFor="retype-password">Retype password</label>
            <input id="retype-password" type="password" onChange={event => setRetypedPassword(event.target.value)}/>

            <div className="purple"><em>{message}</em></div>

            <input className="mt-1" type="submit" />
        </Form>

    );
}

export default UpdatePasswordForm;
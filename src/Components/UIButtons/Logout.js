import styled from "styled-components";
import { logout, useAuthDispatch } from "../../Context";

const Button = styled.button`
    height: 2rem;
    background-color: white;
    color: var(--blue);
    border: none;
`;

const Logout = () => {
    const dispatch = useAuthDispatch();

    const handleLogout = () => {
        logout(dispatch);
    }

    return (
        <Button onClick={handleLogout}>Logout</Button>
    );
}

export default Logout;
import { useEffect, useState } from "react";
import LoadingIndicator, { SmallLoader } from "../Components/LoadingIndicator";
import ToRead from "../Components/ToRead";
import { useAuthState } from "../Context";
import ParseGoogleBookToBook from "../Utilities/ParseGoogleBookToBook";
import { Container, Wrapper } from "./PageLayout";

const UserPage = () => {
    const {userDetails, toRead} = useAuthState();
    const ROOT_URL = process.env.REACT_APP_ROOT_URL;
    const [toReadList, setToReadList] = useState(null);

    useEffect(() => {
        console.log("loading user data...");
        console.log(toRead);
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': userDetails.auth_token, 'Content-Type': 'application/json' },
        };

        if(toRead.length < 1) {
            console.log("fetching!");
            fetch(ROOT_URL + "/user", requestOptions)
                .then(response => response.json())
                .then(result => setToReadList(result.toRead.map(book => ParseGoogleBookToBook(book))));
        }
    }, []);

    useEffect(() => {
        if(toRead.length > 0){
            setToReadList(toRead);
        }
    }, [toRead]);

    console.log(toRead);
    console.log(userDetails);
    let toReadKey = 0;

    return (
        <Wrapper>
            <Container>
                <h1>User Details</h1>
                <p>Logged in as {userDetails.user}</p>
                {toReadList ? toReadList.map(book => <ToRead key={toReadKey++} book={book} />) : null}
            </Container>
        </Wrapper>
    );
}

export default UserPage;
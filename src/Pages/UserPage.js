import { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import LoadingIndicator, { SmallLoader } from "../Components/LoadingIndicator";
import ToRead from "../Components/ToRead";
import { useAuthState } from "../Context";
import { loadUserData } from "../Redux/authActions";
import ParseGoogleBookToBook from "../Utilities/ParseGoogleBookToBook";
import { Container, Wrapper } from "./PageLayout";

const ROOT_URL = process.env.REACT_APP_ROOT_URL;

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toReadList: null
        }
    }

    componentDidMount() {
        this.props.loadData(this.props.userReducer.token);
    }

    // useEffect(() => {
    //     console.log("loading user data...");
    //     console.log(toRead);
    //     const requestOptions = {
    //         method: 'GET',
    //         headers: { 'Authorization': userDetails.auth_token, 'Content-Type': 'application/json' },
    //     };

    //     if(toRead.length < 1) {
    //         console.log("fetching!");
    //         fetch(ROOT_URL + "/user", requestOptions)
    //             .then(response => response.json())
    //             .then(result => setToReadList(result.toRead.map(book => ParseGoogleBookToBook(book))));
    //     }
    // }, []);

    // useEffect(() => {
    //     if(toRead.length > 0){
    //         setToReadList(toRead);
    //     }
    // }, [toRead]);

    // console.log(toRead);
    // console.log(userDetails);

    render() {

        return (
            <Wrapper>
                <Container>
                    <h1>User Details</h1>
                    <p>Logged in as {this.props.userReducer.user}</p>
                    {this.props.bookReducer.toRead ? this.props.bookReducer.toRead.map(book => <ToRead key={book.id} book={book} />) : null}
                </Container>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => ({...state});
const mapDispatchToProps = (dispatch) => ({
    loadData: (token) => dispatch(loadUserData(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
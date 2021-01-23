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